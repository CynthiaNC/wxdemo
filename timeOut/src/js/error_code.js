import {digit} from './digit.js'
var options = {};

function cutdownClock(){
    var canvas = document.getElementById(options.id);
    var context = canvas.getContext('2d');      /* 画布上下文 2d画布 */

    canvas.width = options.CANVAS_WIDTH;
    canvas.height = options.CANVAS_HEIGHT;

    var timing = setInterval(function(){
        context.clearRect(0,0,options.CANVAS_WIDTH,options.CANVAS_HEIGHT);      /* 清除画布 */
        
         render(options.currentShow,context);        /* 描绘数字点 */
         upate(context);     /* 更新数字 */
         upateBall(context);     /* 更新弹弹球 */
        if(options.secondsTime==0){
               setTimeout(function(){
                    clearInterval(timing);
               },9000)
            }
       
    },50)
    var time = setInterval(function(){      /* 倒计时 */
        options.secondsTime--;
               if(options.secondsTime==-1){
                options.callback && options.callback();
                clearInterval(time);
        }
    },1000);
}



function getTime(){
        return options.secondsTime >= 0 ? options.secondsTime : 0;
}



function render(ms,cxt){
    var hour=parseInt(ms/3600);
    var minutes=parseInt((ms-hour*3600)/60);
    var seconds=ms%60;

    
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
    /* 画一个数字的小球 */
    var numOrder = options.numOrder;
    var m = options.m;
    for(var i = 0, top = options.MARGIN_TOP, left = options.MARGIN_LEFT; i < numOrder.length; i++){
        var isCharacter = false;
        if(numOrder[i] == ':'){
             renderDigit( left, top, 10, cxt);
            isCharacter = true;
        }else{
             renderDigit( left, top, parseInt( num[numOrder[i]] ), cxt);
            isCharacter = false;
        }
        if(!m[ numOrder[i] ]) m[ numOrder[i] ] = left;
        left += 2*options.CIRCLE_DIV*( isCharacter ? 4 : 8);  /* 4和8是因为数字是7x10矩阵(加一个间距) ，冒号：是4x10矩阵 */
    }
}

/* 画一个小球 */
function renderDigit(x,y,num,cxt,color){
    for (var i = 0; i < digit[num].length ; i++) {
        for (var j=0;j<digit[num][i].length;j++) {
            if(digit[num][i][j] == 1){
                cxt.beginPath();
                cxt.fillStyle="red"||color;
                cxt.arc( x + options.CIRCLE_DIV*j*2, y + options.CIRCLE_DIV*i*2, options.RADIUS, 0, 2*Math.PI); //要乘以2，因为计算的应该是直径
                cxt.fill();
                cxt.closePath();
            }
        }
    }
}



function upate(context){
    var currentShow = options.currentShow;
    var hour=parseInt(currentShow/3600);
    var minutes=parseInt((currentShow-hour*3600)/60);
    var seconds=currentShow%60;

    var now = getTime();
    var now_hour=parseInt(now/3600);
    var now_minutes=parseInt((now-now_hour*3600)/60);
    var now_seconds=now%60;

    var m = options.m;
    if(seconds !=now_seconds ){
        if(parseInt(hour/10) != parseInt(now_hour/10))
            addBall( m['hour/10'], options.MARGIN_TOP, seconds%10,context);
        if(parseInt(hour%10) != parseInt(now_hour%10))
            addBall( m['hour%10'], options.MARGIN_TOP, hour%10,context);
        if(parseInt(minutes/10) != parseInt(now_minutes/10))
            addBall( m['minutes/10'], options.MARGIN_TOP, parseInt(minutes/10),context);
        if(parseInt(minutes%10) != parseInt(now_minutes%10))
            addBall( m['minutes%10'], options.MARGIN_TOP, minutes%10,context);
        if(parseInt(seconds/10) != parseInt(now_seconds/10))
            addBall( m['seconds/10'], options.MARGIN_TOP, parseInt(seconds/10),context);
        if(parseInt(seconds%10) != parseInt(now_seconds%10))
            addBall( m['seconds%10'], options.MARGIN_TOP, seconds%10,context);
        options.currentShow = now;
    }

} 


function addBall(x,y,num,cxt){
    for (var i = 0; i < digit[num].length ; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if( digit[num][i][j] == 1 ){
                var ball = {
                    x: x + options.CIRCLE_DIV*j*2,
                    y: y + options.CIRCLE_DIV*i*2,
                    vx: Math.pow(-1,Math.ceil(Math.random()*1000))*4,
                    vy: -5,
                    g: 1.5+Math.random(),
                    color: '#'+(~~(Math.random()*(1<<24))).toString(16)
                }
                options.balls.push(ball);
            }
        }
    }
}


function upateBall(context){
    var balls = options.balls;
    for (var i =0;i< balls.length; i++) {
       balls[i].x += balls[i].vx;
       balls[i].y += balls[i].vy;
       balls[i].vy += balls[i].g;

       if( balls[i].y > (options.CANVAS_HEIGHT-options.RADIUS)){
             balls[i].x += balls[i].vx;
             balls[i].y = options.CANVAS_HEIGHT-options.RADIUS;
             balls[i].vy = -balls[i].vy*0.45;
       }

       context.beginPath();
       context.fillStyle=balls[i].color;
       context.arc(balls[i].x,balls[i].y,options.RADIUS,0,2*Math.PI);
       context.fill();
       context.closePath();
    }
    

}


const  Clock = function(option, callback){
     options = {
            id : option.id,
            CANVAS_WIDTH : option.CANVAS_WIDTH||'1200',
            CANVAS_HEIGHT : option.CANVAS_HEIGHT||'400',
            MARGIN_TOP : option.MARGIN_TOP||'0',
            MARGIN_LEFT : option.MARGIN_LEFT||'0',
            RADIUS : option.RADIUS|| 5,
            CIRCLE_DIV : option.CIRCLE_DIV|| 6, /* 包含源点的正方形 1作为间距 */
            numOrder : ['hour/10','hour%10',':','minutes/10','minutes%10',':','seconds/10','seconds%10'],
            m : {}, /* 记录每个数字的margin-left,按上面的顺序查 */
            currentShow : 0,
            balls : [],
            secondsTime : option.secondsTime||10, /* 要倒计的时间 */
            callback : option.callback||function(){}
        }
        cutdownClock();
}

export {Clock};