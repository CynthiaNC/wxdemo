var CANVAS_WIDTH=1200;
var CANVAS_HEIGHT=400;
var MARGIN_TOP=50;
var MARGIN_LEFT=50;
var RADIUS = 5;
var CIRCLE_DIV = RADIUS + 1;//包含源点的正方形 1.3作为间隙
 var numOrder = ['hour/10','hour%10',':','minutes/10','minutes%10',':','seconds/10','seconds%10'];
var m={}; //记录每个数字的margin-left,按上面的顺序查找
var currentShow = 0;
var balls = [];
var secondsTime = 10;


window.onload = function () {
    var = cutdownClock()
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');  //画布上下文 2d画布

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    var timing = setInterval(function(){
        context.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        
        render(currentShow,context);
        upate(context);
        upateBall(context);
        if(secondsTime==0){
               setTimeout(function(){
                    clearInterval(timing)
               },9000)
            }
       
    },50)
    var time = setInterval(function(){
        secondsTime--;
               if(secondsTime==-1){
                clearInterval(time);
        }
    },1000)
}


function upateBall(context){

    for (var i =0;i< balls.length; i++) {
       balls[i].x += balls[i].vx;
       balls[i].y += balls[i].vy;
       balls[i].vy += balls[i].g;

       if( balls[i].y > (CANVAS_HEIGHT-RADIUS)){
             balls[i].x += balls[i].vx;
             balls[i].y = CANVAS_HEIGHT-RADIUS;
             balls[i].vy = -balls[i].vy*0.45;
       }

       context.beginPath();
       context.fillStyle=balls[i].color;
       context.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI);
       context.fill();
       context.closePath();
    }
    

}
function upate(context){
    
    var hour=parseInt(currentShow/3600);
    var minutes=parseInt((currentShow-hour*3600)/60);
    var seconds=currentShow%60;

    var now =getTime();
    var now_hour=parseInt(now/3600);
    var now_minutes=parseInt((now-now_hour*3600)/60);
    var now_seconds=now%60;


    if(seconds !=now_seconds ){
        if(parseInt(hour/10) != parseInt(now_hour/10))
            addBall( m['hour/10'], MARGIN_TOP, seconds%10,context);
        if(parseInt(hour%10) != parseInt(now_hour%10))
            addBall( m['hour%10'], MARGIN_TOP, hour%10,context);
        if(parseInt(minutes/10) != parseInt(now_minutes/10))
            addBall( m['minutes/10'], MARGIN_TOP, parseInt(minutes/10),context);
        if(parseInt(minutes%10) != parseInt(now_minutes%10))
            addBall( m['minutes%10'], MARGIN_TOP, minutes%10,context);
        if(parseInt(seconds/10) != parseInt(now_seconds/10))
            addBall( m['seconds/10'], MARGIN_TOP, parseInt(seconds/10),context);
        if(parseInt(seconds%10) != parseInt(now_seconds%10))
            addBall( m['seconds%10'], MARGIN_TOP, seconds%10,context);
        currentShow = now;
    }

} 


function addBall(x,y,num,cxt){
    for (var i = 0; i < digit[num].length ; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if( digit[num][i][j] == 1 ){
                var ball = {
                    x: x + CIRCLE_DIV * j * 2,
                    y: y + CIRCLE_DIV * i * 2,
                    vx: Math.pow(-1,Math.ceil(Math.random()*1000))*4,
                    vy: -5,
                    g: 1.5+Math.random(),
                    color: '#'+(~~(Math.random()*(1<<24))).toString(16)
                }
                balls.push(ball);
            }
        }
    }
}
function getTime(){
        return secondsTime >= 0 ? secondsTime : 0;
}



function render(ms,cxt){
    var hour=parseInt(ms/3600);
    var minutes=parseInt((ms-hour*3600)/60);
    var seconds=ms%60;

    //画一个数字的小球
    
    //var num = [hour/10,hour%10,':',minutes/10,minutes%10,':',seconds/10,seconds%10];
   
    var num = {
        'hour/10' : hour/10,
        'hour%10' : hour%10,
        ':' : ':',
        'minutes/10' : minutes/10,
        'minutes%10' : minutes%10,
        ':' : ':',
        'seconds/10' : seconds/10,
        'seconds%10' : seconds%10
    }
    for(var i = 0, top = MARGIN_TOP, left = MARGIN_LEFT; i < numOrder.length; i++){
        var isCharacter = false;
        if(numOrder[i] == ':'){
            renderDigit( left, top, 10, cxt);
            isCharacter = true;
        }else{
            renderDigit( left, top, parseInt( num[numOrder[i]] ), cxt);
            isCharacter = false;
        }
        if(!m[ numOrder[i] ]) m[ numOrder[i] ] = left;
        left += 2 * CIRCLE_DIV * ( isCharacter ? 4 : 8);  // 1.3 用来隔离间距 4和7是因为数字是7x10矩阵 ，冒号：是4x10矩阵
    }
}

//画一个小球
function renderDigit(x,y,num,cxt,color){
    for (var i = 0; i < digit[num].length ; i++) {
        for (var j=0;j<digit[num][i].length;j++) {
            if(digit[num][i][j] == 1){
                cxt.beginPath();
                cxt.fillStyle="red"||color;
                cxt.arc( x + CIRCLE_DIV * j * 2, y + CIRCLE_DIV * i * 2, RADIUS, 0, 2*Math.PI); //要乘以2，因为计算的应该是直径
                cxt.fill();
                cxt.closePath();
            }
        }
    }
}