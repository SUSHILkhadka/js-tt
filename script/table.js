class Table{
    constructor(){
    this.bPoint=new Point3D(START_BOARD_x,START_BOARD_y,START_BOARD_z)
    this.llPoint=new Point3D(START_LEG_x,START_LEG_y,START_LEG_z)
    this.lrPoint=new Point3D(START_LEG_xr,START_LEG_y,START_LEG_z)
    this.nPoint=new Point3D(START_NET_x,START_NET_y,START_NET_z)
    // this.drawLegs();
    // this.drawTable();
    // this.drawNet();
    }
    drawTable(ctx){

        drawCube(ctx,this.bPoint,BOARD_WIDTH,BOARD_HEIGHT,BOARD_LENGTH)

    }
    drawMidline(ctx){
        let a=new Point3D(START_BOARD_x+(BOARD_WIDTH/2)-(MID_LINE_WIDTH/2),START_BOARD_y,START_BOARD_z+BOARD_LENGTH)
        let b=new Point3D(START_BOARD_x+(BOARD_WIDTH/2)+(MID_LINE_WIDTH/2),START_BOARD_y,START_BOARD_z+BOARD_LENGTH)
        let c=new Point3D(START_BOARD_x+(BOARD_WIDTH/2)+(MID_LINE_WIDTH/2),START_BOARD_y,START_BOARD_z)
        let d=new Point3D(START_BOARD_x+(BOARD_WIDTH/2)-(MID_LINE_WIDTH/2),START_BOARD_y,START_BOARD_z)
        let ap=project(a);
        let bp=project(b);
        let cp=project(c);
        let dp=project(d);

        drawPolygon(ctx,'rgba(255, 255, 255, 1)',ap,bp,cp,dp);
    }
    drawLegs(ctx){
        let a=new Point3D(START_LEG_x,START_LEG_y,START_LEG_z)
        // let b
        drawCube(ctx,a,LEG_WIDTH,LEG_HEIGHT,LEG_LENGTH);



    }

    drawNet(ctx){
        let topLeft=new Point3D(this.nPoint.x,this.nPoint.y,this.nPoint.z);
        let topRight=new Point3D(this.nPoint.x+NET_WIDHT,this.nPoint.y,this.nPoint.z);
        let bottomRight=new Point3D(this.nPoint.x+NET_WIDHT,this.nPoint.y+NET_HEIGHT,this.nPoint.z);
        let bottomLeft=new Point3D(this.nPoint.x,this.nPoint.y+NET_HEIGHT,this.nPoint.z);

        let a_proj=project(topLeft);
        let b_proj=project(topRight);
        let c_proj=project(bottomRight);
        let d_proj=project(bottomLeft);

        drawPolygon(ctx,'rgba(255, 255, 255, 0.3)',a_proj,b_proj,c_proj,d_proj);
    }
}