class Bat{
    constructor(){
        this.x=START_BOARD_x;
        this.y=START_BOARD_y;
        this.z=START_BOARD_z;

        this.tilt_angle=20;
    }

    updatePosition(x,y,tilt_angle=0){
        this.x=x;
        this.y=y;
    }

    drawBat(ctx){

        // let topLeft=new Point3D(this.x,this.y,this.z);
        // let topRight=new Point3D(this.x+BAT_WIDTH,this.y,this.z);
        // let bottomRight=new Point3D(this.x+BAT_WIDTH,this.y+BAT_HEIGHT,this.z);
        // let bottomLeft=new Point3D(this.x,this.y+BAT_HEIGHT,this.z);

        let topLeft=new Point3D(this.x,this.y,this.z);
        let topRight=new Point3D(this.x+BAT_WIDTH_2d,this.y,this.z);
        let bottomRight=new Point3D(this.x+BAT_WIDTH_2d,this.y+BAT_HEIGHT_2d,this.z);
        let bottomLeft=new Point3D(this.x,this.y+BAT_HEIGHT_2d,this.z);

    console.log("top;eft",topLeft)

        let a_proj=project(topLeft);
        let b_proj=project(topRight);
        let c_proj=project(bottomRight);
        let d_proj=project(bottomLeft);

        // drawPolygon(ctx,'white',a_proj,b_proj,c_proj,d_proj);
        drawPolygon(ctx,'white',topLeft,topRight,bottomRight,bottomLeft);

    }
}