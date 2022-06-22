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

                console.log('ballx and boardx and boardx+width', this.centre.x, START_BOARD_x, START_BOARD_x + BOARD_WIDTH);


                console.log('bally and boardy and ball rad', this.centre.y, START_BOARD_y, this.rad);

                console.log('hit');
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
        // let temp=new Point3D(START_BOARD_x+20,START_BOARD_y,START_BOARD_z+20)
        // this.centre=Object.assign(temp);

        /**
         * bounce
         * 1st one is working good reflection
         * 2nd one with loss
         */

        // this.velocity.y = -this.velocity.y + LOSS;

        // if(thresholdVelocityY>Math.abs(this.velocity.y)){
        // this.centre.y=-0.2;
        //     this.velocity.y=0.00001;
        // }

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
    collisionBBat() {

        if (this.centre.z < START_BOARD_z) {
            console.log('bathit')
            this.velocity.z = -this.velocity.z;

            //add power by adding -LOSS
        }

        if (this.centre.z > START_BOARD_z+BOARD_LENGTH) {
            console.log('bathit')
            this.velocity.z = -this.velocity.z;

            //add power by adding -LOSS
        }

    }
}