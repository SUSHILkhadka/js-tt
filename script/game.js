const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext('2d');

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.style.cursor = 'none'

var world = new World();
var table = new Table()

var centre = new Point3D(0.2, STARTING_BALL_POSITION_Y, 2.09)
var vel = new Point3D(STARTING_BALL_VELOCITY_X, STARTING_BALL_VELOCITY_Y, -0.01);
var ball = new Ball(centre, 0.01, vel)

var bat = new Bat();
var bat_far = new Bat();



let angy = 0;
let angx = 45;
let angy2 = 0;
let angx2 = 45;

var counter = 0;
let scoreboard = document.createElement('div');
let name1 = document.createElement('h3')
name1.innerHTML = 'near'
let score1 = document.createElement('p');
let name2 = document.createElement('h3')
name2.innerHTML = 'far'
let score2 = document.createElement('p');

let serveflag = document.createElement('p');


scoreboard.append(name1);
scoreboard.append(score1);
scoreboard.append(name2);
scoreboard.append(score2);
scoreboard.append(serveflag);

scoreboard.style.position = "relative"

document.body.append(scoreboard);
bat.addMouseController();
bat_far.addKeyboardController();
function play() {
    // window.addEventListener('mousemove', function event(e) {
    //     bat.updatePosition(e.clientX - translateX, e.clientY);

    // });
    window.addEventListener('keypress', function event(e) {
        if (e.code == 'KeyP') {
            if (START_ZPLANE > RESTRICTION_START_ZPLANE_min) {
                START_ZPLANE -= 0.0001;
            }
        }
        if (e.code == 'KeyO') {
            if (START_ZPLANE < RESTRICTION_START_ZPLANE_max) {
                START_ZPLANE += 0.0001;
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
            // viewpointY+=5;
            if (angx2 < RESTRICTION_ANGLE_X) {
                angx2 += increment;
            }
        }
    });

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.translate(translateX, translateY);

    world.drawWorld(ctx, angy, angx);
    // if (angy < 15) {
    //     world.drawWallRight(ctx);
    // }
    // if (angy > -13) {
    //     world.drawWallLeft(ctx);
    // }

    table.drawAll(ctx, angy, angx);
    ball.drawAll(ctx, angy, angx);

    ball.collisionTable(bat, bat_far);
    if(freeze==0)
    {
    ball.collisionBat2(angy, bat, bat_far);
    }
    ball.collisionWorld();
    ball.updatePosition();
    // ball.dontGoOutside();
console.log(ball.serverid);
    bat.drawBat3D(ctx, angy, angx);
    bat.updateAngle(angy);
    bat_far.updateAngle(angy2);

    if(freeze==0){
    bat.updatePosition();

    bat_far.updatePosition();
    }

    //bot tracking movements both x and y:
    bat_far.trackBall(ball);
    bat_far.adjustRange(ball);

    let bat_farMirror = new Bat();
    bat_farMirror.new(bat_far.topLeft, bat_far.topRight, bat_far.bottomLeft, bat_far.bottomRight)
    bat_farMirror.reflection();
    bat_farMirror.drawBat3D(ctx, angy, angx);


    //score

    counter++;

    score1.innerHTML = `${bat.score}`
    score2.innerHTML = `${bat_far.score}`
    serveflag.innerHTML=`correct serve flag=${ball.correctServeFlag},downside collision flag=${ball.downside_collision_flag},upsidecollision flag = ${ball.upside_collision_flag},freeze=${freeze}`
    if(freeze==0){
    updateScore2(ball, bat, bat_far);
    }

    ball.serverid = serveDeterminer(bat.score, bat_far.score, ball.serverid);
    // ball.serverid =2;

    ctx.translate(-translateX, -translateY);
    requestAnimationFrame(play);

}

const canvas2 = document.createElement("canvas")
const ctx2 = canvas2.getContext('2d');
canvas2.width = CANVAS_WIDTH;
canvas2.height = CANVAS_HEIGHT;
canvas2.style.cursor = 'none';

canvas2.width = CANVAS_WIDTH;
canvas2.height = CANVAS_HEIGHT;
canvas2.style.cursor = 'none'

function play2() {
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.strokeRect(0, 0, canvas.width, canvas.height);
    ctx2.translate(translateX, translateY);

    world.drawWorld(ctx2, angy2, angx2);
    // if (rotation_angle < 15) {
    //     world.drawWallRight(ctx2);
    // }
    // if (rotation_angle > -13) {
    //     world.drawWallLeft(ctx2);
    // }
    table.drawAll(ctx2, angy2, angx2);

    let ballMirror = new Ball();
    ballMirror.new(ball.centre, ball.rad, ball.velocity, ball.upside_collision_flag, ball.downside_collision_flag, ball.serveflag,ball.lastCollidedBat)
    ballMirror.reflection();
    ballMirror.drawAll(ctx2, angy2, angx2);
    if(freeze==0)
    {
    ballMirror.collisionBat2(angy2, bat_far, bat, false);
    }
    ball.velocity = ballMirror.velocity;
    ball.serveflag = ballMirror.serveflag;

    bat_far.drawBat3D(ctx2, angy2, angx2);
    if(freeze==0);
    {
    bat_far.updateAngle(angy2);
    bat_far.updatePosition();
    }

    let batMirror = new Bat();
    batMirror.new(bat.topLeft, bat.topRight, bat.bottomLeft, bat.bottomRight)
    batMirror.reflection();
    batMirror.drawBat3D(ctx2, angy2, angx2);

    ctx2.translate(-translateX, -translateY);
    document.body.append(canvas2);
    requestAnimationFrame(play2);
}


imageObj.style.height = 10;
imageObj.style.width = 10;
imageObj.onload = function () {
    pattern = ctx.createPattern(imageObj, 'repeat');
};
imageObj2.onload = function () {
    netpattern = ctx.createPattern(imageObj2, 'repeat');
};
imageObj3.onload = function () {
    floorpattern = ctx.createPattern(imageObj3, 'repeat');
};
batimage.onload = () => {
    play();
    play2();
}





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