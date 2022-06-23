const canvas=document.querySelector(".canvas")
const ctx=canvas.getContext('2d');

canvas.height=CANVAS_WIDTH;
canvas.width=CANVAS_WIDTH;

canvas.style.cursor='none'


var table=new Table()
// var centre=new Point3D(0.2 ,-0.2,1.09)
var centre=new Point3D(0.2 ,STARTING_BALL_POSITION_Y,1.09)


var vel=new Point3D(0.0,STARTING_BALL_VELOCITY_Y,-0.04);
var ball = new Ball(centre,0.01,vel)

var bat= new Bat();

canvas.addEventListener('mousemove', function event(e) {
    // console.log(e.clientX);
    // console.log(e.clientY);
bat.updatePosition(e.clientX-translateX,e.clientY-translateY);

});

function play(){
    window.addEventListener('keypress', function event(e) {
        if (e.code == 'KeyI' || e.key=='ArrowUp') {
            ball.centre.z-=0.0001;
    
        }  
        
 
        
          if (e.code == 'KeyO' || e.key=='ArrowUp') {
            ball.centre.z+=0.0001;
        }
        if (e.code == 'KeyY' || e.key=='ArrowUp') {
            ball.centre.x+=0.01;
        } 
        if (e.code == 'KeyU' || e.key=='ArrowUp') {
            ball.centre.y-=0.00001;
    
        } 
        if (e.code == 'KeyP' || e.key=='ArrowUp') {
            ball.centre.y+=0.00001;
    
        } 



        if (e.code == 'KeyA' || e.key=='ArrowUp') {
            rotation_angle+=increment;

        }
        
        if (e.code == 'KeyD' || e.key=='ArrowUp') {
    
            rotation_angle-=increment;
    
        }
    
        if (e.code == 'KeyW' || e.key=='ArrowUp') {
            rotation_anglex-=increment;
            
    
        }    if (e.code == 'KeyS' || e.key=='ArrowUp') {
            // viewpointY+=5;
            rotation_anglex+=increment ;

        }

    });



    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.translate(translateX, translateY);

    
    table.drawTable(ctx);
    table.drawNet(ctx);

    ball.drawBall(ctx);
    ball.drawShadow(ctx);
    ball.collisionTable();
    ball.collisionBat(bat);
    ball.respawn(); 
    ball.collisionWorld();
    ball.updatePosition();
    bat.drawBat(ctx);
    bat.updateAngle();
    bat.drawBat3D(ctx);
    // bat.drawBat3D1(ctx);

    
    bat.updatePosition();
    // console.log('yang',rotation_angle)
    // console.log('xang',rotation_anglex)

    ctx.translate(-translateX, -translateY);

requestAnimationFrame(play);

}
play();



