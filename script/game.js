function gameloop(gamemode=1,training=0){
let gamebox = document.createElement("div")
gamebox.style.position='relative';
gamebox.style.backgroundColor='black'

document.body.append(gamebox)
let canvas = document.createElement("canvas")
let ctx = canvas.getContext('2d');
gamebox.append(canvas)

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
let adjustXdependingOnGameMode=-100
let adjustYdependingOnGameMode=200;

canvas.style.cursor = 'none'
let canvas2 = document.createElement("canvas")
let ctx2 = canvas2.getContext('2d');

if(gamemode==2){
adjustXdependingOnGameMode=0
adjustYdependingOnGameMode=0;
canvasWidthDividerForMultiplayer=1
canvasHeightDividerForMultiplayer=2

WIDTH_SCALE_FOR_PROJECTION=2;
HEIGHT_SCALE_FOR_PROJECTION=2;

ballradiusfactor=2.2
shadowradiusfactor=6000

START_ZPLANE=1.5

canvas.width = CANVAS_WIDTH/canvasWidthDividerForMultiplayer;
canvas.height = CANVAS_HEIGHT/canvasHeightDividerForMultiplayer;

gamebox.append(canvas2)
canvas2.width = CANVAS_WIDTH/canvasWidthDividerForMultiplayer;
canvas2.height = CANVAS_HEIGHT/canvasHeightDividerForMultiplayer;
canvas2.style.cursor = 'none'

}

let world = new World();
let table = new Table()

let centre = new Point3D(0.2, STARTING_BALL_POSITION_Y, 2.09)
let vel = new Point3D(STARTING_BALL_VELOCITY_X, STARTING_BALL_VELOCITY_Y, -0.01);
let ball = new Ball(centre, 0.01, vel)

let bat = new Bat();
let bat_far = new Bat();

let angy = 0;
let angx = 25;
let angy2 = 0;
let angx2 = 25;

let targetScore=6;

let backbutton=document.createElement('button')
backbutton.innerHTML='quit';
backbutton.style.position='absolute';
backbutton.style.top='0px';
backbutton.style.right='0px';
backbutton.addEventListener('click',function event(e){
    gamebox.innerHTML='';
    menu.style.display='block';
    world=null;    
    ball=null;
    bat=null;
    bat_far=null;
    return 0;
})

gamebox.append(backbutton);


let scoreboard = document.createElement('div');
let name1 = document.createElement('h3')
name1.innerHTML = 'near'
let name2 = document.createElement('h3')
name2.innerHTML = 'far'
let score1 = document.createElement('p');
let score2 = document.createElement('p');
let serveflag = document.createElement('p');




scoreboard.append(name1);
scoreboard.append(score1);
scoreboard.append(name2);
scoreboard.append(score2);
scoreboard.append(serveflag);
scoreboard.style.background='transparent'
scoreboard.style.position = "absolute";
scoreboard.style.zIndex = "1"
scoreboard.style.top='0px';
scoreboard.style.left='0px';


gamebox.append(scoreboard);
bat.addMouseController();
if(training==1){
    bat.addKeyboardController();
}
if(gamemode==2){
bat_far.addKeyboardController();
}
window.addEventListener('keydown', function event(e) {
    if (e.code == 'KeyP') {
        if (START_ZPLANE > RESTRICTION_START_ZPLANE_min) {
            START_ZPLANE -= incrementDistance;
        }
    }
    if (e.code == 'KeyO') {
        if (START_ZPLANE < RESTRICTION_START_ZPLANE_max) {
            START_ZPLANE +=incrementDistance;
        }
    }
    if (e.code == 'KeyA') {
        if (angy < RESTRICTION_ANGLE_Y) {
            angy += increment;
        }
    }
    if (e.code == 'KeyD') {
        if (angy > - RESTRICTION_ANGLE_Y) {
            angy -= increment;
        }
    }
    if (e.code == 'KeyW') {

        if (angx > 0) {
            angx -= increment;
        }

    } if (e.code == 'KeyS') {
        // viewpointY+=5;
        if (angx < RESTRICTION_ANGLE_X) {
            angx += increment;
        }
    }

    if (e.code == 'KeyL') {
        if (angy2 < RESTRICTION_ANGLE_Y) {
            angy2 += increment;
        }
    }

    if (e.code == 'KeyJ') {
        if (angy2 > - RESTRICTION_ANGLE_Y) {
            angy2 -= increment;
        }
    }

    if (e.code == 'KeyI') {
        if (angx2 > 0) {
            angx2 -= increment;
        }

    } if (e.code == 'KeyK') {
        if (angx2 < RESTRICTION_ANGLE_X) {
            angx2 += increment;
        }
    }
});

function play() {


    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle='#87ceeb'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    if(bat.score>=targetScore || bat_far.score>=targetScore)
    {
        gamebox.innerHTML='';
    menu.style.display='block';
    world=null;    
    ball=null;
    bat=null;
    bat_far=null;
        return 0;
    }

    bat.updateAngle(angy);
    bat_far.updateAngle(angy2);
    let bat_farMirror = new Bat();
    bat_farMirror.new(bat_far.topLeft, bat_far.topRight, bat_far.bottomLeft, bat_far.bottomRight)
    bat_farMirror.reflection();
    ball.collisionWorld();
    ball.updatePosition();
    ball.collisionTable(bat, bat_far);
    if(training==1)
    {
    ball.dontGoOutside();
    }


    if(freeze==0)
    {
        ball.collisionBat2(angy,angy2, bat, bat_far);
    bat.updatePosition();
    bat_far.updatePosition();
    }
    //bot tracking movements both x and y:
    if(gamemode==1 && freeze==0 && training==0){
    bat_far.trackBall(ball);
    bat_far.adjustRange(ball);
    }


    ctx.translate(translateX+adjustXdependingOnGameMode, translateY+adjustYdependingOnGameMode);
    world.drawWorld(ctx, angy, angx);
    if (angy < 14) {
        console.log('ffff')
        world.drawWallRight(ctx,angy,angx);
    }
    if (angy > -14) {
        world.drawWallLeft(ctx,angy,angx);
    }
    table.drawAll(ctx, angy, angx);
    ball.drawAll(ctx, angy, angx);
    if(training==0){
    bat_farMirror.drawBat3D(ctx, angy, angx);
    }
    bat.drawBat3D(ctx, angy, angx);



    //score
    score1.innerHTML = `${bat.score}`
    score2.innerHTML = `${bat_far.score}`
    serveflag.innerHTML=`downside collision flag=${ball.downside_collision_flag},upsidecollision flag = ${ball.upside_collision_flag},freeze=${freeze}`
    if(freeze==0 && training==0){
    updateScore2(ball, bat, bat_far);
    }

    ball.serverid = serveDeterminer(bat.score, bat_far.score, ball.serverid);
    if(gamemode==1)
    {
        ball.serverid =1
    }
    ctx.translate(-translateX-adjustXdependingOnGameMode, -translateY-adjustYdependingOnGameMode);


    //next bat calculation
    let ballMirror = new Ball();
    ballMirror.new(ball.centre, ball.rad, ball.velocity, ball.upside_collision_flag, ball.downside_collision_flag, ball.serveflag,ball.lastCollidedBat)
    ballMirror.reflection();
    let batMirror = new Bat();
    batMirror.new(bat.topLeft, bat.topRight, bat.bottomLeft, bat.bottomRight)
    batMirror.reflection();
    if(freeze==0)
    {
    ballMirror.collisionBat2(angy,angy2, bat_far, bat, false);
    ball.velocity = ballMirror.velocity;
    ball.serveflag = ballMirror.serveflag;
    bat_far.updateAngle(angy2);
    bat_far.updatePosition();
    }



//next bat draw
    if(gamemode==2){
        ctx2.clearRect(0, 0, canvas.width, canvas.height);
        ctx2.strokeRect(0, 0, canvas.width, canvas.height);
    ctx2.translate(translateX, translateY);
    let world2=new World();
    world2.drawWorld(ctx2, angy2, angx2);
    if (angy2 < 15) {
        world2.drawWallRight(ctx2, angy2, angx2);
    }
    if (angy2 > -14) {
        world2.drawWallLeft(ctx2, angy2, angx2);
    }
    table.drawAll(ctx2, angy2, angx2);
    ballMirror.drawAll(ctx2, angy2, angx2);
    batMirror.drawBat3D(ctx2, angy2, angx2);
    bat_far.drawBat3D(ctx2, angy2, angx2);
    ctx2.translate(-translateX, -translateY);


    }


    requestAnimationFrame(play);

}

imageObj.onload = function () {
    pattern = ctx.createPattern(imageObj, 'repeat');
};

texture.onload = function () {
    texturepattern = ctx.createPattern(texture, 'repeat');
    ctx.drawImage(texture, 0, 0);
    ctx.beginPath();
    ctx.moveTo(30, 96);
    ctx.lineTo(70, 66);
    ctx.lineTo(103, 76);
    ctx.lineTo(170, 15);
    ctx.stroke();
};
imageObj2.onload = function () {
    netpattern = ctx.createPattern(imageObj2, 'repeat');

};
imageObj3.onload = function () {
    floorpattern = ctx.createPattern(imageObj3, 'repeat');
};
batimage.src="./asset/bat.png";
texture.src="./asset/walltexture1.png";
imageObj.src="asset/wall.png";
imageObj2.src="../asset/net.png";
imageObj3.src="asset/floor.jpg";
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

play();
}



/**
 * 
 * @param {*} ball used for upside collision count, downside collision count, and other flags
 * @param {*} bat for updating score
 * @param {*} bat_far for updating score
 */

function updateScore2(ball, bat, bat_far) {
if(freeze==0){
    if(ball.outOfBoard==1){
        if(ball.serverid==1){

            if(ball.downside_collision_flag-ball.upside_collision_flag==0){
                bat.score++;
                ball.startServe();

            }
            else if(ball.downside_collision_flag>ball.upside_collision_flag){
                bat_far.score++
        ball.startServe();

            }

        }
        else{
            if(ball.upside_collision_flag-ball.downside_collision_flag==0){
                bat_far.score++;
        ball.startServe();

            }
            else if(ball.upside_collision_flag>ball.downside_collision_flag){
                bat.score++;
        ball.startServe();

            }
        }

    }

    else if(ball.serverid==1){
        if(ball.upside_collision_flag==1 && ball.downside_collision_flag==0){
            //invalid serve
            bat_far.score++;
            ball.startServe();
        }
        else if(ball.downside_collision_flag-ball.upside_collision_flag>=2){
            bat_far.score++;
            ball.startServe();
        }

        else if(ball.upside_collision_flag-ball.downside_collision_flag>=1){
            bat.score++;
            ball.startServe();
        }
    }
   else if(ball.serverid==2){
        if(ball.downside_collision_flag==1 && ball.upside_collision_flag==0){
            //invalid serve
            bat.score++;
            ball.startServe();
        }
        else if(ball.upside_collision_flag-ball.downside_collision_flag>=2){
            bat.score++;
            ball.startServe();
        }
        else if(ball.downside_collision_flag-ball.upside_collision_flag>=1){
            bat_far.score++;
            ball.startServe();
        }
    }

}
}