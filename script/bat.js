class Bat{
    constructor(){
        this.x=START_BOARD_x;
        this.y=START_BOARD_y;
        this.z=START_BOARD_z;
        this.point3D=new Point3D();

        // this.point=new Point3D();
        this.angle=0;
        this.tilt_angle=20;
        this.topLeft=0;
        this.topRight=0
        this.bottomLeft=0;

    }

    updatePosition(x=nomouse,y=nomouse,tilt_angle=0){

        if(x==nomouse && y==nomouse)
        {
        }
        else{
        this.x=x;
        this.y=y;

        this.point3D.z=((this.y)*(-(START_BOARD_z+BOARD_LENGTH)+0.5)/(CANVAS_WIDTH-0))+1.6  ;
        if(this.point3D.z>1.3)
        {
            this.point3D.z=1.3
        }
        this.point3D.x=((this.x)*(1.6)/(CANVAS_WIDTH-0))+0;
        this.point3D.y=-NET_HEIGHT;
    }


    }
    updateAngle(){

    this.topLeft=new Point3D(this.point3D.x,this.point3D.y,this.point3D.z);
    this.topRight=new Point3D(this.point3D.x+BAT_WIDTH,this.point3D.y,this.point3D.z);
    this.bottomRight=new Point3D(this.point3D.x+BAT_WIDTH,this.point3D.y+BAT_HEIGHT,this.point3D.z);
    this.bottomLeft=new Point3D(this.point3D.x,this.point3D.y+BAT_HEIGHT,this.point3D.z);

    let dest=new Point3D(-0.15,0,-1.3)
        let temp1=translate(this.topLeft,dest)
        let temp2=translate(this.topRight,dest)
        let temp3=translate(this.bottomRight,dest)
        let temp4=translate(this.bottomLeft,dest)

        let roty1=rotateY(temp1,-1*rotation_angle);
        let roty2=rotateY(temp2,-1*rotation_angle);
        let roty3=rotateY(temp3,-1*rotation_angle);
        let roty4=rotateY(temp4,-1*rotation_angle);

    let dest1=new Point3D(0.15,0,+1.3)

        let temp11=translate(roty1,dest1)
        let temp21=translate(roty2,dest1)
        let temp31=translate(roty3,dest1)
        let temp41=translate(roty4,dest1)

        this.topLeft=temp11;
        this.topRight=temp21;
        this.bottomRight=temp31;
        this.bottomLeft=temp41;

    }


    drawBat(ctx){

        // let topLeft=new Point3D(this.x,this.y,this.z);
        // let topRight=new Point3D(this.x+BAT_WIDTH,this.y,this.z);
        // let bottomRight=new Point3D(this.x+BAT_WIDTH,this.y+BAT_HEIGHT,this.z);
        // let bottomLeft=new Point3D(this.x,this.y+BAT_HEIGHT,this.z);

        let topLeft1=new Point3D(this.x,this.y,this.z);
        let topRight1=new Point3D(this.x+BAT_WIDTH_2d,this.y,this.z);
        let bottomRight1=new Point3D(this.x+BAT_WIDTH_2d,this.y+BAT_HEIGHT_2d,this.z);
        let bottomLeft1=new Point3D(this.x,this.y+BAT_HEIGHT_2d,this.z);

        let a_proj=project(topLeft1);
        let b_proj=project(topRight1);
        let c_proj=project(bottomRight1);
        let d_proj=project(bottomLeft1);

        // drawPolygon(ctx,'white',a_proj,b_proj,c_proj,d_proj);
        drawPolygon(ctx,'white',topLeft1,topRight1,bottomRight1,bottomLeft1);

    }
    drawBat3D(ctx){



        // console.log('inside draw x=',this.point3D.x);

        let a_proj=project(this.topLeft);
        let b_proj=project(this.topRight);
        let c_proj=project(this.bottomRight);
        let d_proj=project(this.bottomLeft);

        // a_proj.x=this.x;
        // b_proj.x=this.x+BAT_WIDTH_2d;
        // c_proj.x=this.x+BAT_WIDTH_2d;
        // d_proj.x=this.x;

        drawPolygon(ctx,'white',a_proj,b_proj,c_proj,d_proj);

    }

}