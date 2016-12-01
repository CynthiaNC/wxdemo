var CANVAS_WIDTH=1200;
var CANVAS_HEIGHT=400;
var MARGIN_TOP=50;
var MARGIN_LEFT=50;
var RADIUS = 10;
var endDate = new Date(2016,11,3,21,23,30);

var tangram = [
    {p:[{x:0,y:0},{x:80,y:0},{x:40,y:40}],color:'#caff67'},
    {p:[{x:0,y:0},{x:40,y:40},{x:0,y:80}],color:'#67beef'},
    {p:[{x:80,y:0},{x:80,y:40},{x:60,y:60},{x:60,y:20}],color:'#cf3d61'},
    {p:[{x:60,y:20},{x:60,y:60},{x:40,y:40}],color:'#f9f51a'},
    {p:[{x:40,y:40},{x:60,y:60},{x:40,y:80},{x:20,y:60}],color:'#a594c0'},
    {p:[{x:20,y:60},{x:40,y:80},{x:0,y:80}],color:'#fa8ccc'},
    {p:[{x:80,y:40},{x:80,y:80},{x:40,y:80}],color:'#f6ca29'}
]
var ball = {x:50,y:50,r:RADIUS,g:10,vx:1,vy:2}
window.onload = function () {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');  //画布上下文 2d画布

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    
    setInterval(function(){
        context.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        render(getTime(),context);
        renderBall(context);
    },50)
    

    //画线条
    // context.beginPath()//状态开始
    // context.moveTo(100,100)
    // context.lineTo(700,700)
    // context.lineTo(100,700)
    // context.lineTo(100,100)
    // context.lineWidth = 5;
    // context.strokeStyle = "red"
    // context.stroke()//笔画，线条
    // context.closePath()
    // context.fillStyle = "yellow";
    // context.fill()//颜色填充

    //  context.moveTo(30,30)
    // context.lineTo(50,50)
    // context.lineTo(30,70)
    // context.lineWidth = 1;
    // context.strokeStyle = "red"
    // context.stroke()//笔画，线条
    
    // //七巧板
    // for (var i = tangram.length - 1; i >= 0; i--) {
    //     draw(tangram[i],context);
    // }

    //获取鼠标在画布上的位置
    // canvas.addEventListener('click',function(e){
    //     var clientRect = canvas.getBoundingClientRect();//canvas 信息 ClientRect {top: 50, right: 1046.5, bottom: 850, left: 22.5, width: 1024}
    //     var mousePos = {
    //         x: e.clientX - clientRect.left,
    //         y: e.clientY - clientRect.top
    //     }
    //     console.log(mousePos)
    // })
    

    //部分圆 填充
    //circle(context);
    



}

function circle(context){
    //部分圆 填充
    context.beginPath()
    context.strokeStyle="red"
    context.fillStyle="yellow"
    context.moveTo(300,300);
    context.arc(300,300,20,0,1.8*Math.PI);
    context.lineTo(300,300);
    context.stroke();
    context.fill();

    context.closePath();//自动封闭当前路径，对fill没用

}





function onPiece(point){


}

//七巧板
function    draw(piece,cxt){
    cxt.beginPath();
    cxt.moveTo(piece.p[0].x,piece.p[0].y);
    for (var i =1; i<piece.p.length;i++ ) {
        cxt.lineTo(piece.p[i].x,piece.p[i].y);
    }
    cxt.closePath();
    cxt.fillStyle = piece.color;
    cxt.fill();
    cxt.strokeStyle = "black"
    cxt.stroke()//笔画，线条
}

function renderBall(context){
    ball.x += ball.vx;
    ball.y += ball.vy;
    ball.vy += ball.g;

    if( ball.y > (CANVAS_HEIGHT-RADIUS)){
          ball.x += ball.vx;
          ball.y = CANVAS_HEIGHT-RADIUS;
          ball.vy = -ball.vy*0.5;
    }

    context.beginPath();
    context.fillStyle="blue";
    context.arc(ball.x,ball.y,RADIUS,0,2*Math.PI);
    context.fill();
    context.closePath();

}

function getTime(){
    var current = new Date();
    var ret = endDate.getTime() - current.getTime();
    ret = Math.round(ret/1000);

    return ret >= 0 ? ret : 0;
}

function render(ms,cxt){
    console.log(ms)
    var hour=parseInt(ms/3600);
    var minutes=parseInt((ms-hour*3600)/60);
    var seconds=ms%60;

    //renderDigit(MARGIN_LEFT + 7*(RADIUS+1),MARGIN_TOP,hour%10,cxt);
    renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hour/10),cxt);
    renderDigit(MARGIN_LEFT + 1*7*2*(RADIUS+1) ,MARGIN_TOP,hour%10,cxt);
    renderDigit(MARGIN_LEFT + 2*7*2*(RADIUS+1) ,MARGIN_TOP,10,cxt);
    renderDigit(MARGIN_LEFT + (2*7+4)*2*(RADIUS+1) ,MARGIN_TOP,parseInt(minutes/10),cxt);
    renderDigit(MARGIN_LEFT + (3*7+4)*2*(RADIUS+1) ,MARGIN_TOP,minutes%10,cxt);
    renderDigit(MARGIN_LEFT + (4*7+4)*2*(RADIUS+1) ,MARGIN_TOP,10,cxt);
    renderDigit(MARGIN_LEFT + (4*7+8)*2*(RADIUS+1) ,MARGIN_TOP,parseInt(seconds/10),cxt);
    renderDigit(MARGIN_LEFT + (5*7+8)*2*(RADIUS+1) ,MARGIN_TOP,seconds%10,cxt);
}


function renderDigit(x,y,num,cxt){
    console.log(num)
    for (var i = 0; i < digit[num].length ; i++) {
        for (var j=0;j<digit[num][i].length;j++) {
            if(digit[num][i][j] == 1){
                cxt.beginPath();
                cxt.fillStyle="red";
                cxt.arc(x+(RADIUS+1)*j*2, y+ (RADIUS+1)*i*2, RADIUS, 0, 2*Math.PI); //要乘以2，因为计算的应该是直径
                //cxt.arc(x+(radius+1)*(j+1), y+ (radius+1)*(i+1), radius, 0, 2*Math.PI);
                cxt.fill();
                cxt.closePath();
            }
            

        }
    }

}