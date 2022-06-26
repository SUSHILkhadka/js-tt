class World{
    constructor(){

    }

    drawGround(ctx){
        this.point=new Point3D(GROUND_START_x,GROUND_START_y,GROUND_START_z)
        let b=new Point3D(GROUND_START_x+GROUND_WIDTH,GROUND_START_y,GROUND_START_z);
        let c=new Point3D(GROUND_START_x+GROUND_WIDTH,GROUND_START_y,GROUND_START_z+GROUND_LENGTH);
        let d=new Point3D(GROUND_START_x,GROUND_START_y,GROUND_START_z+GROUND_LENGTH);

        let ap=project(this.point);
        let bp=project(b);
        let cp=project(c);
        let dp=project(d);
        drawPolygon(ctx,"gret",ap,bp,cp,dp);
        // drawCube(ctx,this.point,GROUND_WIDTH,1,GROUND_LENGTH);
    }
    drawWall1(ctx){
        let a=new Point3D(GROUND_START_x,GROUND_START_y,GROUND_START_z+GROUND_LENGTH);
        let b=new Point3D(GROUND_START_x+GROUND_WIDTH,GROUND_START_y,GROUND_START_z+GROUND_LENGTH);
        let c= new Point3D(GROUND_START_x+GROUND_WIDTH,GROUND_START_y-WALL_HEIGHT,GROUND_START_z+GROUND_LENGTH);
        let d= new Point3D(GROUND_START_x,GROUND_START_y-WALL_HEIGHT,GROUND_START_z+GROUND_LENGTH);
        let ap=project(a);
        let bp=project(b);
        let cp=project(c);
        let dp=project(d);
        drawPolygon(ctx,netpattern,ap,bp,cp,dp);
    }
    drawWallLeft(ctx){
        let a=new Point3D(GROUND_START_x,GROUND_START_y,GROUND_START_z+GROUND_LENGTH);
        let b= new Point3D(GROUND_START_x,GROUND_START_y-WALL_HEIGHT,GROUND_START_z+GROUND_LENGTH);
        let c=new Point3D(GROUND_START_x,GROUND_START_y-WALL_HEIGHT,GROUND_START_z);
        let d= new Point3D(GROUND_START_x,GROUND_START_y,GROUND_START_z);
        let ap=project(a);
        let bp=project(b);
        let cp=project(c);
        let dp=project(d);
        drawPolygon(ctx,pattern,ap,bp,cp,dp);
    }
    drawWallRight(ctx){
        let a=new Point3D(GROUND_START_x+GROUND_WIDTH,GROUND_START_y,GROUND_START_z+GROUND_LENGTH);
        let b= new Point3D(GROUND_START_x+GROUND_WIDTH,GROUND_START_y-WALL_HEIGHT,GROUND_START_z+GROUND_LENGTH);
        let c=new Point3D(GROUND_START_x+GROUND_WIDTH,GROUND_START_y-WALL_HEIGHT,GROUND_START_z);
        let d= new Point3D(GROUND_START_x+GROUND_WIDTH,GROUND_START_y,GROUND_START_z);
        let ap=project(a);
        let bp=project(b);
        let cp=project(c);
        let dp=project(d);
        drawPolygon(ctx,"green",ap,bp,cp,dp);
    }
}