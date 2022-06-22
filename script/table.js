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
    drawLegs(){


    }

    drawNet(){

    }
}