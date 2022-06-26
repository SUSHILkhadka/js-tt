class Ball {
    constructor(centre, rad, velocity) {
        this.centre = centre;
        this.rad = rad;
        this.velocity = velocity;
        // this.mass=mass;

        this.upside_collision_flag = 0;
        this.downside_collision_flag = 0;
    }
    new(centre, rad, velocity) {
        this.centre = Object.create(centre);
        this.rad = rad;
        this.velocity = Object.create(velocity)
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
    collisionTable(bat, bat_far) {
        if (this.centre.x >= START_BOARD_x && this.centre.x < START_BOARD_x + BOARD_WIDTH && this.centre.z >= START_BOARD_z && this.centre.z < START_BOARD_z + BOARD_LENGTH) {
            if (START_BOARD_y - this.centre.y <= this.rad) {

                if (this.centre.z > (START_BOARD_z + BOARD_LENGTH / 2)) {
                    this.upside_collision_flag++;
                    this.downside_collision_flag = 0;
                    if (this.upside_collision_flag >= 2) {
                        bat.score++;

                        console.log('my bat score increased to ', bat.score)

                        //respawn logic
                    }


                }
                if (this.centre.z < (START_BOARD_z + BOARD_LENGTH / 2)) {
                    this.upside_collision_flag = 0;
                    this.downside_collision_flag++;

                    if (this.downside_collision_flag >= 2) {
                        bat_far.score++;

                        console.log('otherbat bat score increased to ', bat_far.score)
                        //respawn logic
                    }
                }







                console.log('upside flag', this.upside_collision_flag)
                console.log('downside flag', this.downside_collision_flag)


                this.velocity.y = -Math.abs(this.velocity.y) + LOSS_TABLE;
                bounche.play();
                if (this.centre.y > START_BOARD_y) {
                    this.respawn();
                }
            }
        }
    }

    dontGoOutside() {
        if (this.centre.z > START_BOARD_z + BOARD_LENGTH) {
            // console.log('wallhit')
            this.velocity.z = -Math.abs(this.velocity.z)+LOSS_TABLE;
            // this.velocity.z = -0.03;
            wallsound.play();

            //add power by adding -LOSS
            // this.velocity.y = STABLE_Y_VELOCITY;

        }

        if (this.centre.z < START_BOARD_z) {
            // console.log('wallhit')
            this.velocity.z = Math.abs(this.velocity.z);
            //add power by adding -LOSS
        }

        // if (this.centre.x < START_BOARD_x) {
        //     // console.log('wallhit')
        //     this.velocity.x = Math.abs(this.velocity.x);
        //     //add power by adding -LOSS
        // }

        // if (this.centre.x > START_BOARD_x + BOARD_WIDTH) {
        //     // console.log('wallhit')
        //     this.velocity.x = -Math.abs(this.velocity.x);
        //     //add power by adding -LOSS
        // }
    }


    collisionWorld() {
        if (GROUND_START_y - this.centre.y <= this.rad) {
            this.velocity.y = -Math.abs(this.velocity.y) + LOSS_GROUND;
            // this.respawn();
        }

        if ((GROUND_START_y - WALL_HEIGHT) > this.centre.y) {
            this.velocity.y = Math.abs(this.velocity.y);
        }

        if((GROUND_START_z+GROUND_LENGTH)<=this.centre.z){
            this.velocity.z=-this.velocity.z;
        }
        if((GROUND_START_x+GROUND_WIDTH)<=this.centre.x){
            this.velocity.x=-this.velocity.x;
        }
        if((GROUND_START_x)>=this.centre.x){
            this.velocity.x=-this.velocity.x;
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

    // collisionBat(bat, speedx = 0, speedy = 0, bat_far) {
    //     if (ball.centre.x >= bat.topLeft.x - this.rad && ball.centre.x <= bat.topRight.x + this.rad) {
    //         let dx = ((bat.topRight.x - ball.centre.x) - (bat.topLeft.x - ball.centre.x));
    //         let dz = ((bat.topRight.z - ball.centre.z) - (bat.topLeft.z - ball.centre.z));
    //         let dr = Math.sqrt(dx * dx + dz * dz);
    //         let D = (bat.topLeft.x - ball.centre.x) * (bat.topRight.z - ball.centre.z) - (bat.topRight.x - ball.centre.x) * (bat.topRight.z - ball.centre.z);
    //         let delta = (this.rad * this.rad * dr * dr) - (D * D);

    //         if (delta >= 0) {
    //             bat.collision_flag++;
    //             bat_far.collision_flag = 0;

    //             this.velocity.x += -RESPONSE_SCALE_ZtoX * Math.tan(rotation_angle * Math.PI / 180) * Math.abs(this.velocity.z);
    //             this.velocity.z = -this.velocity.z - RESPONSE_SCALE_Z * speedy;
    //             // this.velocity.y -= RESPONSE_SCALE_Y*speedy;
    //             this.velocity.x += RESPONSE_SCALE_X * speedx;
    //             this.velocity.y = STABLE_Y_VELOCITY;
    //         }
    //     }
    // }


    collisionBat2(bat, speedx = 0, speedy = 0, bat_far, near = true) {
        let a = rotateY(this.centre, rotation_angle);
        let b = rotateY(bat.topLeft, rotation_angle);
        let c = rotateY(bat.topRight, rotation_angle);

        if (b.x <= a.x && c.x >= a.x) {

            console.log('z axis value should be equal', b.z, c.z);
            if (near == true) {
                if (((b.z - a.z) >= 0) && ((b.z-a.z)<BAT_LENGTHINZAXIS_FOR_SHOT)) {
                    if(soundflag==1)
                    {
                    batsound.play();
                    soundflag=0;
                

                    
                    // this.velocity.x += -RESPONSE_SCALE_ZtoX * Math.tan(rotation_angle * Math.PI / 180) * Math.abs(this.velocity.z);
                    // this.velocity.z = Math.abs(this.velocity.z) - RESPONSE_SCALE_Z * speedy;
                    // this.velocity.x += RESPONSE_SCALE_X * speedx;
                    this.centre.y=SHOT_POSITION_Y
                    this.velocity.y = STABLE_Y_VELOCITY;
                    this.velocity.x += -RESPONSE_SCALE_ZtoX * Math.tan(rotation_angle * Math.PI / 180) * Math.abs(this.velocity.z);
                    this.velocity.z = Math.abs(this.velocity.z)*0.8- RESPONSE_SCALE_Z * speedy-0.001;
                    this.velocity.x = RESPONSE_SCALE_X * speedx;
                }
                setTimeout(function(){
                    soundflag=1;

                },1000)
            }
            }
            else {
                if (a.z >= b.z) {

                    if(soundflag==1)
                    {batsound.play();}

                    this.velocity.x += -RESPONSE_SCALE_ZtoX * Math.tan(rotation_angle * Math.PI / 180) * Math.abs(this.velocity.z);
                    this.velocity.z = -Math.abs(this.velocity.z) - RESPONSE_SCALE_Z * speedy;
                    this.velocity.x += RESPONSE_SCALE_X * speedx;
                    this.centre.y=SHOT_POSITION_Y
                    this.velocity.y = STABLE_Y_VELOCITY;
                }
            }

        }
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