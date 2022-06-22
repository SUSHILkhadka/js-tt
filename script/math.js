degrees=90
aspect=1
zfar=10
znear=1
q=zfar/(zfar-znear);
const f=1/Math.tan((degrees/2) * Math.PI / 180) 
function project(point)
{

    let dest=new Point3D(0,0,-1)
    let temp=translate(point,dest)

    let roty=rotateY(temp,rotation_angle);
    let rot=rotateX(roty,rotation_anglex);

    let destmid=new Point3D(0,0,1)
    let tempmid=translate(rot,destmid)
    point=Object.assign(tempmid);

    let proj=new Point3D(0,0,0)
    proj.x=(aspect*f*point.x)/point.z;
    proj.y=(f*point.y)/point.z;

    let dest1=new Point3D(0,0,+1)
    let temp1=translate(proj,dest1)

    temp1.x*=CANVAS_WIDTH
    temp1.y*=CANVAS_HEIGHT

    return temp1;
}

// function draw(ctx,)
function translate(point,dest){
    let temp=new Point3D(0,0,0)
    temp.x=point.x+dest.x
    temp.y=point.y+dest.y
    temp.z=point.z+dest.z
    return temp;

}

function rotateY(point,ang){
    let temp=new Point3D()
    temp.x=point.z*Math.sin(ang*Math.PI/180)+point.x*Math.cos(ang*Math.PI/180)
    temp.y=point.y;
    temp.z=point.z*Math.cos(ang*Math.PI/180)-point.x*Math.sin(ang*Math.PI/180)
    return temp;
}
function rotateX(point,ang){
    let temp=new Point3D()
    temp.x=point.x;
    temp.y=point.y*Math.cos(ang*Math.PI/180)-point.z*Math.sin(ang*Math.PI/180)
    temp.z=point.y*Math.sin(ang*Math.PI/180)+point.z*Math.cos(ang*Math.PI/180)
    return temp;
}