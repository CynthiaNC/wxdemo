var CANVAS_WIDTH=1200;
var CANVAS_HEIGHT=500;
var MARGIN_TOP=50;
var MARGIN_LEFT=50;
var RADIUS = 5;
var DATE_RADIUS=1;
var endDate = new Date(2016,11,1,11,19,10);
var showDate='';
var currentShow = 0;
var colors=['rgba(249, 134, 149, 0.8)','rgba(247, 145, 234, 0.8)','rgba(214, 126, 246, 0.8)','rgba(36, 240, 70, 0.8)','rgba(102, 244, 240, 0.8)','rgba(227, 193, 251, 0.8)'];
//var colors=['rgb(249, 134, 149)','rgb(247, 145, 234)','rgb(214, 126, 246)','rgb(36, 240, 70)','rgb(102, 244, 240)','rgb(227, 193, 251)'];

var tangram = [
    {p:[{x:0,y:0},{x:80,y:0},{x:40,y:40}],color:'#caff67'},
    {p:[{x:0,y:0},{x:40,y:40},{x:0,y:80}],color:'#67beef'},
    {p:[{x:80,y:0},{x:80,y:40},{x:60,y:60},{x:60,y:20}],color:'#cf3d61'},
    {p:[{x:60,y:20},{x:60,y:60},{x:40,y:40}],color:'#f9f51a'},
    {p:[{x:40,y:40},{x:60,y:60},{x:40,y:80},{x:20,y:60}],color:'#a594c0'},
    {p:[{x:20,y:60},{x:40,y:80},{x:0,y:80}],color:'#fa8ccc'},
    {p:[{x:80,y:40},{x:80,y:80},{x:40,y:80}],color:'#f6ca29'}
]
var balls = [];

window.onload = function () {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');  //画布上下文 2d画布

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    currentShow=getTime();
    setInterval(function(){
        context.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        
        render(currentShow,context);
        upate(context);
        upateBall(context);
    },50)
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
        if(parseInt(seconds%10) != parseInt(now_seconds%10))
            addBall(MARGIN_LEFT + (1+(5*7+8)*2)*(RADIUS+1.2),MARGIN_TOP,seconds%10,context);
        if(parseInt(hour%10) != parseInt(now_hour%10))
            addBall(MARGIN_LEFT + (1+1*7*2)*(RADIUS+1.2) ,MARGIN_TOP,hour%10,context);
        if(parseInt(minutes/10) != parseInt(now_minutes/10))
            addBall(MARGIN_LEFT + (1+(2*7+4)*2)*(RADIUS+1.2) ,MARGIN_TOP,parseInt(minutes/10),context);
        if(parseInt(minutes%10) != parseInt(now_minutes%10))
            addBall(MARGIN_LEFT + (1+(3*7+4)*2)*(RADIUS+1.2) ,MARGIN_TOP,minutes%10,context);
        if(parseInt(seconds/10) != parseInt(now_seconds/10))
            addBall(MARGIN_LEFT + (1+(4*7+8)*2)*(RADIUS+1.2) ,MARGIN_TOP,parseInt(seconds/10),context);
        if(parseInt(hour/10) != parseInt(now_hour/10))
            addBall(MARGIN_LEFT,MARGIN_TOP,seconds%10,context);
        currentShow = now;
    }

} 


function addBall(x,y,num,cxt){
    for (var i = 0; i < digit[num].length ; i++) {
        for (var j=0;j<digit[num][i].length;j++) {
            if(digit[num][i][j] == 1){
                var ball = {
                    x:x+(RADIUS+1)*j*2,
                    y:y+ (RADIUS+1)*i*2,
                    vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
                    vy:-5,
                    g:1.5+Math.random(),
                    color:colors[Math.floor(Math.random()*colors.length)]
                }
                balls.push(ball);

                cxt.beginPath();
                cxt.fillStyle=ball.color;
                cxt.arc(ball.x, ball.y, RADIUS, 0, 2*Math.PI); //要乘以2，因为计算的应该是直径
                cxt.fill();
                cxt.closePath();
            }
        }
    }
}
function getTime(){
    var date = getDate()
    if(date.isFutureTime){
            var current = new Date();
            var end = date.isToday ? endDate : new Date(current.getFullYear(),current.getMonth(),current.getDate(),23,59,59)
            var ret = end.getTime() - current.getTime();
            ret = Math.round(ret/1000);

            return ret >= 0 ? ret : 0;
    }else
            return 0;

}

function getDate(){
    // if((endDate instanceof Date) == false)
    //     return{
    //         isFutureTime:false
    //     }
    var now = new Date();
    var ret = endDate.getTime() - now.getTime();

    var yearRet = endDate.getFullYear() - now.getFullYear();
    var monthRet = endDate.getMonth() - now.getMonth();
    var dateRet = endDate.getDate() - now.getDate();

    var m = endDate.getMonth()+1 >>0;
    var d=endDate.getDate();
    var year =  endDate.getFullYear()
    var month = m> 9 ? m: '0' + m;
    var date = d> 9 ? d: '0' + d;
    showDate =year+ '/' + month+ '/'+ date;
    return {
        isFutureTime: ret>0,//yearRet >= 0 && monthRet >= 0 && dateRet>= 0,
        isToday:ret<86400000,
        dateRet:dateRet
    }
}


function render(ms,cxt){
    var hour=parseInt(ms/3600);
    var minutes=parseInt((ms-hour*3600)/60);
    var seconds=ms%60;

    //画一个数字的小球
    //renderDigit(MARGIN_LEFT + 7*(RADIUS+1),MARGIN_TOP,hour%10,cxt);
    renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hour/10),cxt);
    renderDigit(MARGIN_LEFT  + (1+ 1*7*2)*(RADIUS+1.2) ,MARGIN_TOP,hour%10,cxt);
    renderDigit(MARGIN_LEFT  + (1+ 2*7*2)*(RADIUS+1.2) ,MARGIN_TOP,10,cxt);
    renderDigit(MARGIN_LEFT  + (1+ (2*7+4)*2)*(RADIUS+1.2) ,MARGIN_TOP,parseInt(minutes/10),cxt);
    renderDigit(MARGIN_LEFT  + (1+ (3*7+4)*2)*(RADIUS+1.2) ,MARGIN_TOP,minutes%10,cxt);
    renderDigit(MARGIN_LEFT  + (1+ (4*7+4)*2)*(RADIUS+1.2) ,MARGIN_TOP,10,cxt);
    renderDigit(MARGIN_LEFT  + (1+ (4*7+8)*2)*(RADIUS+1.2) ,MARGIN_TOP,parseInt(seconds/10),cxt);
    renderDigit(MARGIN_LEFT  + (1+ (5*7+8)*2)*(RADIUS+1.2) ,MARGIN_TOP,seconds%10,cxt);


    for(var t=MARGIN_TOP+150,l=MARGIN_LEFT,s=0;s<showDate.length;s++){
        if(showDate[s] == '/')
            renderDigit( l, t, 11, cxt);
        else
            renderDigit( l, t, showDate[s], cxt);
        l = l+(7*2)*(RADIUS+2);
    }

}

//画一个小球
function renderDigit(x,y,num,cxt){
    for (var i = 0; i < digit[num].length ; i++) {
        for (var j=0;j<digit[num][i].length;j++) {
            if(digit[num][i][j] == 1){
                cxt.beginPath();
                cxt.fillStyle="red";
                cxt.arc(x+(RADIUS+1)*j*2, y+ (RADIUS+1)*i*2, RADIUS, 0, 2*Math.PI); //要乘以2，因为计算的应该是直径
                cxt.fill();
                cxt.closePath();
            }
        }
    }

}