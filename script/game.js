const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext('2d');

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.style.cursor = 'none';



canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.style.cursor = 'none'

var world = new World();
var table = new Table()

var centre = new Point3D(0.2, STARTING_BALL_POSITION_Y, 1.09)
var vel = new Point3D(STARTING_BALL_VELOCITY_X, STARTING_BALL_VELOCITY_Y, +0.01);
var ball = new Ball(centre, 0.01, vel)

var bat = new Bat();
var bat_far = new Bat();

var keyboardClientX = 500;
var keyboardClientY = 500;


var timestamp = 0;
var lastMouseX = 0;
var lastMouseY = 0;
var speedX = 0;
var speedY = 0;

document.body.addEventListener("mousemove", function (e) {
    if (timestamp === null) {
        timestamp = Date.now();
        lastMouseX = e.screenX;
        lastMouseY = e.screenY;
        return;
    }

    var now = Date.now();
    var dt = now - timestamp;
    var dx = e.screenX - lastMouseX;
    var dy = e.screenY - lastMouseY;
    speedX = Math.round(dx / dt * 100);
    speedY = Math.round(dy / dt * 100);

    timestamp = now;
    lastMouseX = e.screenX;
    lastMouseY = e.screenY;
});


window.addEventListener('keypress', function event(e) {

    if (e.code == 'KeyT') {
        keyboardClientY -= 1

    }
    if (e.code == 'KeyG') {
        keyboardClientY += 1

    }
    if (e.code == 'KeyF') {
        keyboardClientX -= 1

    }
    if (e.code == 'KeyH') {
        keyboardClientX += 1

    }
    bat_far.updatePosition(keyboardClientX - translateX, keyboardClientY);

});

function play() {
    canvas.addEventListener('mousemove', function event(e) {
        bat.updatePosition(e.clientX - translateX, e.clientY);

    });
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
            if (rotation_angle < RESTRICTION_ANGLE_Y) {
                rotation_angle += increment;

            }

        }

        if (e.code == 'KeyD') {

            if (rotation_angle >- RESTRICTION_ANGLE_Y) {
                rotation_angle -= increment;

            }

        }

        if (e.code == 'KeyW') {

            if (rotation_anglex > 0) {
                rotation_anglex -= increment;
            }

        } if (e.code == 'KeyS') {
            // viewpointY+=5;
            if (rotation_anglex < RESTRICTION_ANGLE_X) {
                rotation_anglex += increment;

            }

        }

    });

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.translate(translateX, translateY);

    world.drawGround(ctx);
    world.drawWall1(ctx);

    if (rotation_angle < 15) {
        world.drawWallRight(ctx);
    }
    if (rotation_angle > -13) {
        world.drawWallLeft(ctx);
    }
    table.drawLegs(ctx);
    table.drawTable(ctx);
    table.drawMidline(ctx);
    table.drawNet(ctx);


    ball.drawShadow(ctx);
    ball.drawBall(ctx);
    ball.collisionTable();
    // ball.collisionBat(bat,speedX,speedY);
    ball.collisionBat(bat, 0, 0);



    // ball.respawn();
    ball.collisionWorld();
    ball.updatePosition();
    ball.dontGoOutside();

    // bat.drawBat(ctx);
    bat.updateAngle();
    bat.drawBat3D(ctx);
    bat.updatePosition();

    // bat_far.drawBat(ctx);
    bat_far.updateAngle();
    // bat_far.drawBat3D(ctx);
    bat_far.updatePosition();




    let bat_farMirror = new Bat();
    bat_farMirror.new(bat_far.topLeft, bat_far.topRight, bat_far.bottomLeft, bat_far.bottomRight)
    bat_farMirror.reflection();
    bat_farMirror.drawBat3D(ctx);
    // ball.collisionBat(bat_farMirror);


    ctx.translate(-translateX, -translateY);
    requestAnimationFrame(play);

}
play();

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
    ctx2.translate(translateX2, translateY2);

    world.drawGround(ctx2);
    world.drawWall1(ctx2);

    if (rotation_angle < 15) {
        world.drawWallRight(ctx2);
    }
    if (rotation_angle > -13) {
        world.drawWallLeft(ctx2);
    }

    table.drawLegs(ctx2);
    table.drawTable(ctx2);
    table.drawMidline(ctx2);
    table.drawNet(ctx2);


    let ballMirror = new Ball();
    ballMirror.new(ball.centre, ball.rad, ball.velocity)
    ballMirror.reflection();
    ballMirror.drawShadow(ctx2);
    ballMirror.drawBall(ctx2);

    bat_far.updateAngle();
    bat_far.drawBat3D(ctx2);
    bat_far.updatePosition();

    let batMirror = new Bat();
    batMirror.new(bat.topLeft, bat.topRight, bat.bottomLeft, bat.bottomRight)
    batMirror.reflection();
    batMirror.drawBat3D(ctx2);



    ctx2.translate(-translateX2, -translateY2);
    requestAnimationFrame(play2);

}
document.body.append(canvas2);
play2();
