const canvas=document.querySelector(".canvas")
const ctx=canvas.getContext('2d');

canvas.width=CANVAS_WIDTH;
canvas.height=CANVAS_HEIGHT;

canvas.style.cursor='none'

var world=new World();
var table=new Table()
// var centre=new Point3D(0.2 ,-0.2,1.09)
var centre=new Point3D(0.2 ,STARTING_BALL_POSITION_Y,1.09)


var vel=new Point3D(-0.0,STARTING_BALL_VELOCITY_Y,-0.04);
var ball = new Ball(centre,0.01,vel)

var bat= new Bat();
var bat_far= new Bat();




var keyboardClientX=500;
var keyboardClientY=500;
window.addEventListener('keypress', function event(e) {


    if (e.code == 'KeyT' || e.key=='ArrowUp') {
        keyboardClientY-=1

    }  
      if (e.code == 'KeyG' || e.key=='ArrowUp') {
        keyboardClientY+=1

    }
    if (e.code == 'KeyF' || e.key=='ArrowUp') {
        keyboardClientX-=1

    } 
    if (e.code == 'KeyH' || e.key=='ArrowUp') {
        keyboardClientX+=1

    } 
    console.log('error??')

bat_far.updatePosition(keyboardClientX-translateX,keyboardClientY);

});

function play(){
    canvas.addEventListener('mousemove', function event(e) {
        bat.updatePosition(e.clientX-translateX,e.clientY);
        
        });
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
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.translate(translateX, translateY);
    
    world.drawGround(ctx);
    world.drawWall1(ctx);

    if(rotation_angle<15){
    // world.drawWallR(ctx);
    }
    if(rotation_angle>-13){
    // world.drawWallL(ctx);

        }



    table.drawTable(ctx);
    table.drawNet(ctx);
    
    ball.drawShadow(ctx);
    ball.drawBall(ctx);
    ball.collisionTable();
    ball.collisionBat(bat);
    // ball.collisionBat(bat_far);

    ball.respawn(); 
    ball.collisionWorld();
    ball.updatePosition();

    // bat.drawBat(ctx);
    bat.updateAngle();
    bat.drawBat3D(ctx);
    bat.updatePosition();

    // bat_far.drawBat(ctx);
    bat_far.updateAngle();
    bat_far.drawBat3D(ctx);
    bat_far.updatePosition();

    // console.log('yang',rotation_angle)
    // console.log('xang',rotation_anglex)

    ctx.translate(-translateX, -translateY);

requestAnimationFrame(play);

}
play();



