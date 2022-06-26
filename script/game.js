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

var centre = new Point3D(0.2, STARTING_BALL_POSITION_Y, 2.09)
var vel = new Point3D(STARTING_BALL_VELOCITY_X, STARTING_BALL_VELOCITY_Y, -0.01);
var ball = new Ball(centre, 0.01, vel)

var bat = new Bat();
var bat_far = new Bat();

var keyboardClientX = 600;
var keyboardClientY = 300;


var timestamp = 0;
var lastMouseX = 0;
var lastMouseY = 0;
var speedX = 0;
var speedY = 0;


let angy=0;
let angx=45;
let angy2=0;
let angx2=45;


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
        keyboardClientY -= KeyboardMovement

    }
    if (e.code == 'KeyG') {
        keyboardClientY += KeyboardMovement

    }
    if (e.code == 'KeyF') {
        keyboardClientX -= KeyboardMovement

    }
    if (e.code == 'KeyH') {
        keyboardClientX += KeyboardMovement

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
            if (angy < RESTRICTION_ANGLE_Y) {
                angy += increment;

            }
        }

        if (e.code == 'KeyD') {

            if (angy >- RESTRICTION_ANGLE_Y) {
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

            if (angy2 >- RESTRICTION_ANGLE_Y) {
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

    world.drawWorld(ctx,angy,angx);
    // if (angy < 15) {
    //     world.drawWallRight(ctx);
    // }
    // if (angy > -13) {
    //     world.drawWallLeft(ctx);
    // }

    table.drawAll(ctx,angy,angx);
    ball.drawAll(ctx,angy,angx);

    ball.collisionTable(bat,bat_far);
    ball.collisionBat2(angy,bat,speedX,speedY,bat_far);
    ball.collisionWorld();
    ball.updatePosition();
    ball.dontGoOutside();

    bat.drawBat3D(ctx,angy,angx);
    bat.updateAngle(angy);
    bat.updatePosition();

    bat_far.updateAngle(angy2);
    bat_far.updatePosition();

//bot tracking movements both x and y:
    // bat_far.trackBall(ball);
    // bat_far.adjustRange(ball);

    let bat_farMirror = new Bat();
    bat_farMirror.new(bat_far.topLeft, bat_far.topRight, bat_far.bottomLeft, bat_far.bottomRight)
    bat_farMirror.reflection();
    bat_farMirror.drawBat3D(ctx,angy,angx);

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

    world.drawWorld(ctx2,angy2,angx2);
    // if (rotation_angle < 15) {
    //     world.drawWallRight(ctx2);
    // }
    // if (rotation_angle > -13) {
    //     world.drawWallLeft(ctx2);
    // }

    table.drawAll(ctx2,angy2,angx2);

    let ballMirror = new Ball();
    // ball.reflection();
    ballMirror.new(ball.centre, ball.rad, ball.velocity)
    ballMirror.reflection();
    ballMirror.drawAll(ctx2,angy2,angx2);

    ballMirror.collisionBat2(angy2,bat_far,0,0,bat,false);
    ball.velocity=ballMirror.velocity;

    bat_far.drawBat3D(ctx2,angy2,angx2);
    bat_far.updateAngle(angy2);
    bat_far.updatePosition();

    let batMirror = new Bat();
    batMirror.new(bat.topLeft, bat.topRight, bat.bottomLeft, bat.bottomRight)
    batMirror.reflection();
    // batMirror.drawBat3D(ctx2,-angy,angx);
    batMirror.drawBat3D(ctx2, angy2,angx2);

    ctx2.translate(-translateX, -translateY);
    requestAnimationFrame(play2);
    document.body.append(canvas2);
}

imageObj.style.height=10;
imageObj.style.width=10;

imageObj.onload = function() {
   pattern = ctx.createPattern(imageObj, 'repeat');
};
imageObj2.onload = function() {
   netpattern = ctx.createPattern(imageObj2, 'repeat');

};

imageObj3.onload = function() {
    floorpattern = ctx.createPattern(imageObj3, 'repeat');
 };


batimage.onload = () => {
    play();
    play2();}

