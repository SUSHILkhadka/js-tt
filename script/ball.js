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


        this.centre.x += this.velocity.x*timeScale
        this.centre.y += this.velocity.y*timeScale
        this.centre.z += this.velocity.z*timeScale
    }

    drawBall(ctx) {

        drawSphere(ctx, this.centre, this.rad);
    }

    drawShadow(ctx){
        shadowCircle(ctx,this.centre,this.rad)
        
    }


    //since table position static no need to pass argument here
    collisionTable() {
        if (this.centre.x >= START_BOARD_x && this.centre.x < START_BOARD_x + BOARD_WIDTH && this.centre.z >= START_BOARD_z && this.centre.z < START_BOARD_z + BOARD_LENGTH) {
            if (START_BOARD_y - this.centre.y <= this.rad) {
                this.velocity.y = -Math.abs(this.velocity.y)+LOSS ;

            }
        }


    }
    collisionWorld() {
        if (this.centre.y > FLOORSTART_Y) {
            this.respawn();
        }
    }
    respawn() {


        if(this.centre.y>START_BOARD_y){
            this.centre.y=STARTING_BALL_POSITION_Y
            this.velocity.y=STARTING_BALL_VELOCITY_Y
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


        if (this.centre.z > START_BOARD_z+BOARD_LENGTH) {
            console.log('wallhit')
            this.velocity.z = -this.velocity.z;

            //add power by adding -LOSS
        }

        if (this.centre.z < START_BOARD_z) {
            console.log('wallhit')
            this.velocity.z = -this.velocity.z;

            //add power by adding -LOSS
        }
        // console.log('this.centre.x=',this.centre.x)
        // console.log('bat.topLeft.x= ',bat.topLeft.x)
        if(Math.abs(this.centre.z-bat.topLeft.z)<=thresholdZ )
        {
            console.log('bathit')

            if(this.centre.x>=bat.topLeft.x && this.centre.x<=bat.topRight.x){
                if(this.centre.y>=bat.topLeft.y && this.centre.y<=bat.bottomLeft.y){
                    this.velocity.z=-this.velocity.z;

                }
            }
        }
        // if(Math.abs(this.centre.z-bat.topLeft.z)<=thresholdZ)
        // {
        //     console.log('bathit')
            // this.velocity.z=-this.velocity.z;
        // }



    }
}