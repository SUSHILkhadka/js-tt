class Ball {
    constructor(centre, rad, velocity) {
        this.centre = centre;
        this.rad = rad;
        this.velocity = velocity;
        // this.mass=mass;
    }
    new(centre,rad,velocity){
        this.centre=Object.create(centre);
        this.rad=rad;
        this.velocity=Object.create(velocity)
    }

    updatePosition() {
        this.velocity.y += GRAVITY

        this.centre.x += this.velocity.x * timeScale
        this.centre.y += this.velocity.y * timeScale
        this.centre.z += this.velocity.z * timeScale
    }

    drawBall(ctx) {

        drawSphere(ctx, this.centre, this.rad);
    }

    drawShadow(ctx) {
        shadowCircle(ctx, this.centre, this.rad)
    }

    //since table position static no need to pass argument here
    collisionTable() {
        if (this.centre.x >= START_BOARD_x && this.centre.x < START_BOARD_x + BOARD_WIDTH && this.centre.z >= START_BOARD_z && this.centre.z < START_BOARD_z + BOARD_LENGTH) {
            if (START_BOARD_y - this.centre.y <= this.rad) {
                this.velocity.y = -Math.abs(this.velocity.y) + LOSS_TABLE;
                // this.centre.y=START_BOARD_y+this.rad;
                var audio = new Audio('asset/sound1.mp3');
audio.play();
                if(this.centre.y>START_BOARD_y){
                    this.respawn();
                }
            }
        }
    }

    dontGoOutside(){
        if (this.centre.z > START_BOARD_z + BOARD_LENGTH) {
            // console.log('wallhit')
            // this.velocity.z = -Math.abs(this.velocity.z);
            this.velocity.z = -0.03;

            //add power by adding -LOSS
            this.velocity.y=STABLE_Y_VELOCITY;

        }

        if (this.centre.z < START_BOARD_z) {
            // console.log('wallhit')
            this.velocity.z = Math.abs(this.velocity.z);
            //add power by adding -LOSS
        }

        if (this.centre.x < START_BOARD_x) {
            // console.log('wallhit')
            this.velocity.x = Math.abs(this.velocity.x);
            //add power by adding -LOSS
        }

        if (this.centre.x > START_BOARD_x+BOARD_WIDTH) {
            // console.log('wallhit')
            this.velocity.x = -Math.abs(this.velocity.x);
            //add power by adding -LOSS
        }
    }


    collisionWorld() {
        if (GROUND_START_y - this.centre.y <= this.rad) {
            this.velocity.y = -Math.abs(this.velocity.y) + LOSS_GROUND;

            // this.respawn();
        }
    }
    respawn() {


        if (this.centre.y > START_BOARD_y) {
            this.centre.y = STARTING_BALL_POSITION_Y
            this.velocity.y = STARTING_BALL_VELOCITY_Y
        }


        /**
         * normal reset position
         */
        // this.centre.x=START_BOARD_x+20;
        // this.centre.y=START_BOARD_y; 
        // this.centre.z=START_BOARD_z+20;
        // this.velocity.y=0
    }

    collisionBat(bat,speedx=0,speedy=0) {


        if (ball.centre.x >= bat.topLeft.x - this.rad && ball.centre.x <= bat.topRight.x + this.rad) {
            // if((this.centre.z<=bat.topLeft.z && this.centre.z>=bat.topRight.z) ||(this.centre.z>=bat.topLeft.z && this.centre.z<=bat.topRight.z) ){
            // console.log("topleft x and z=", bat.topLeft.x, bat.topLeft.z)
            // console.log("ball centre x and z=", this.centre.x, this.centre.z)

            let dx = ((bat.topRight.x - ball.centre.x) - (bat.topLeft.x - ball.centre.x));
            let dz = ((bat.topRight.z - ball.centre.z) - (bat.topLeft.z - ball.centre.z));
            let dr = Math.sqrt(dx * dx + dz * dz);
            let D = (bat.topLeft.x - ball.centre.x) * (bat.topRight.z - ball.centre.z) - (bat.topRight.x - ball.centre.x) * (bat.topRight.z - ball.centre.z);
            let delta = (this.rad * this.rad * dr * dr) - (D * D);

            if (delta >= 0) {

                this.velocity.x+=-RESPONSE_SCALE_ZtoX*Math.tan(rotation_angle*Math.PI/180)*Math.abs(this.velocity.z);
                this.velocity.z = Math.abs(this.velocity.z)-RESPONSE_SCALE_Z*speedy;

                // this.velocity.y -= RESPONSE_SCALE_Y*speedy;

                this.velocity.x+=RESPONSE_SCALE_X*speedx;
                this.velocity.y=STABLE_Y_VELOCITY;


            }
        }
        // }
    }

    reflection() {
        //first translate world to allign such that point of reflection align with z plane
        let dest = new Point3D(-START_BOARD_x, -START_BOARD_y, -(START_BOARD_z + (BOARD_LENGTH / 2)));
        translateByReference(this.centre, dest);


        //then reflect about xy plane
        this.centre.z = -this.centre.z


        //then undo translation
        let dest1 = new Point3D(START_BOARD_x, START_BOARD_y, START_BOARD_z + (BOARD_LENGTH / 2));
        translateByReference(this.centre, dest1);

    }
}