class Ball {
    constructor(centre, rad, velocity) {
        this.centre = centre;
        this.rad = rad;
        this.velocity = velocity;
        // this.mass=mass;
    }

    updatePosition() {
        this.velocity.y += GRAVITY
        // this.velocity.z-=GRAVITY


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
                this.velocity.y = -Math.abs(this.velocity.y) + LOSS;

            }
        }


    }
    collisionWorld() {
        if (this.centre.y > FLOORSTART_Y) {
            this.respawn();
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


    //since table position of 2 bats are changing, pass 2 bats info here
    // collisionBat() {

    //     if (this.centre.z < START_BOARD_z) {
    //         console.log('bathit')
    //         this.velocity.z = -this.velocity.z;

    //         //add power by adding -LOSS
    //     }

    //     if (this.centre.z > START_BOARD_z+BOARD_LENGTH) {
    //         console.log('bathit')
    //         this.velocity.z = -this.velocity.z;

    //         //add power by adding -LOSS
    //     }

    // }
    collisionBat(bat) {
        console.log(this.rad);

        if (this.centre.z > START_BOARD_z + BOARD_LENGTH) {
            // console.log('wallhit')
            this.velocity.z = -this.velocity.z;

            //add power by adding -LOSS
        }

        if (this.centre.z < START_BOARD_z) {
            // console.log('wallhit')
            this.velocity.z = -this.velocity.z;

            //add power by adding -LOSS
        }
  
        if(ball.centre.x>=bat.topLeft.x-this.rad && ball.centre.x<=bat.topRight.x+this.rad)   {
            // if((this.centre.z<=bat.topLeft.z && this.centre.z>=bat.topRight.z) ||(this.centre.z>=bat.topLeft.z && this.centre.z<=bat.topRight.z) ){
            console.log("topleft x and z=",bat.topLeft.x,bat.topLeft.z)
            console.log("ball centre x and z=",this.centre.x,this.centre.z)

            let dx = ((bat.topRight.x-ball.centre.x) - (bat.topLeft.x-ball.centre.x));
            let dz = ((bat.topRight.z-ball.centre.z) - (bat.topLeft.z - ball.centre.z));
            let dr =Math.sqrt( dx * dx + dz * dz);
            let D = (bat.topLeft.x-ball.centre.x) * (bat.topRight.z-ball.centre.z) - (bat.topRight.x-ball.centre.x) * (bat.topRight.z-ball.centre.z);
            let delta = (this.rad * this.rad * dr * dr) - (D * D);

            if (delta >= 0) {
                console.log('bathit')
                    this.velocity.z = -this.velocity.z;
            // }
        }
        }
        // }



    }
}