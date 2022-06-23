
function toPx(value){
    return `${value}px`
}
function distance(p1,p2){

    return (Math.sqrt((p2.x-p1.x)*(p2.x-p1.x)+(p2.y-p1.y)*(p2.y-p1.y)+(p2.z-p1.z)*(p2.z-p1.z)))
}
function distance2D(p1,p2){

    return (Math.sqrt((p2.x-p1.x)*(p2.x-p1.x)+(p2.y-p1.y)*(p2.y-p1.y)))
}

var viewPoint = new Point3D(700, -2000, 10);
var viewPlane = new Plane3D(0, 0, 1, 20);


function getDirectionVector(obj1, obj2) {
    let a = new Point3D(0, 0, 0);
    a.x = obj2.x - obj1.x;
    a.y = obj2.y - obj1.y;
    a.z = obj2.z - obj1.z;
    return a;
}

function getPlane(n, point) {
    let a = new Plane3D(0, 0, 0);
    a.x = n.x;
    a.y = n.y;
    a.z = n.z;
    a.c = n.x * point.x + n.y * point.y + n.z * point.z;
    return a;
}

function getPointOnPlane(point1, point2 = viewPoint, plane = viewPlane) {

    let dir = getDirectionVector(point1, point2);
    let t_numerator = (plane.c - (plane.x * point1.x + plane.y * point1.y + plane.z * point1.z));
    let t_denomenator = (plane.x * dir.x + plane.y * dir.y + plane.z * dir.z);
    let t = t_numerator / t_denomenator;

    let a = new Point3D(0, 0, 0);
    a.x = Math.round(point1.x + dir.x * t);
    a.y = Math.round(point1.y + dir.y * t);
    a.z = point1.z + dir.z * t;
    return a;
}


function drawPolygon(ctx, color, ...obj) {

    ctx.beginPath();
    obj.forEach((value, index) => {
        if (index == 0) {
            ctx.moveTo(value.x, value.y);
        }
        else {
            ctx.lineTo(value.x, value.y);
        }
    });
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = 2;
    // ctx.strokeStyle='white';
    ctx.stroke();
}
function drawPolygonImage(ctx, color, ...obj) {
    const img = new Image();
    img.src='asset/bat.png'
    ctx.beginPath();
  img.onload = function() {

    obj.forEach((value, index) => {
        if (index == 0) {
            ctx.moveTo(value.x, value.y);
        }
        else {
            ctx.lineTo(value.x, value.y);
        }
    });
};
ctx.closePath();
// ctx.clip();
ctx.drawImage(img, 10, 0,10,100);

    // ctx.fillStyle = color;
    // ctx.fill();
    ctx.lineWidth = 2;
    // ctx.strokeStyle='white';
    ctx.stroke();
    // ctx.restore();
    
}
function drawCircle(ctx, obj, rad) {
    ctx.beginPath();

    ctx.arc(obj.x, obj.y, rad, 0, 2 * Math.PI);
    ctx.fillStyle=BALL_COLOR[0]
    ctx.fill();
    ctx.stroke();
}
function shadowCircle(ctx, centre, rad) {

    // centre.x=c   entre.x;
    // centre.y=START_BOARD_y;
    // centre.z=centre.z;

    let temp = new Point3D(centre.x,START_BOARD_y,centre.z);
    // console.log('centre-y',centre.y)
    let centre2D=project(temp);

    let radiusShadow=rad*(-centre.y)*5000;

    if(radiusShadow<0){
        radiusShadow=0
    }

    

    ctx.beginPath();
    ctx.arc(centre2D.x, centre2D.y, radiusShadow, 0, 2 * Math.PI);
    ctx.fillStyle='black';
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
    ctx.fill();

    // ctx.stroke();
}

function drawCube(ctx, point, width, height, length) {
    //get 8 point coordinates
    let pointa = Object.assign(point);

    let pointb = new Point3D(pointa.x + width, pointa.y, pointa.z)
    let pointc = new Point3D(pointa.x + width, pointa.y + height, pointa.z)
    let pointd = new Point3D(pointa.x, pointa.y + height, pointa.z)

    let pointa_be = new Point3D(pointa.x, pointb.y, pointc.z + length);
    let pointb_be = new Point3D(pointa.x + width, pointa.y, pointa.z + length)
    let pointc_be = new Point3D(pointa.x + width, pointa.y + height, pointa.z + length)
    let pointd_be = new Point3D(pointa.x, pointa.y + height, pointa.z + length)

    // project above coordinates
    // pointa = getPointOnPlane(pointa);
    // pointb = getPointOnPlane(pointb);
    // pointc = getPointOnPlane(pointc);
    // pointd = getPointOnPlane(pointd);

    // pointa_be = getPointOnPlane(pointa_be);
    // pointb_be = getPointOnPlane(pointb_be);
    // pointc_be = getPointOnPlane(pointc_be);
    // pointd_be = getPointOnPlane(pointd_be);


    pointa = project(pointa);
    pointb = project(pointb);
    pointc = project(pointc);
    pointd = project(pointd);

    pointa_be = project(pointa_be);
    pointb_be = project(pointb_be);
    pointc_be = project(pointc_be);
    pointd_be = project(pointd_be);

    // drawCircle(ctx,pointa,10)
    // drawCircle(ctx,pointb,10)
    // drawCircle(ctx,pointa_be,10)

    //draw 6 faces
    drawPolygon(ctx, TABLE_COLOR[0], pointa_be, pointb_be, pointc_be, pointd_be)
    drawPolygon(ctx, TABLE_COLOR[1], pointa, pointd, pointd_be, pointa_be)
    drawPolygon(ctx, TABLE_COLOR[1], pointb, pointc, pointc_be, pointb_be)
    drawPolygon(ctx, TABLE_COLOR[0], pointa, pointb, pointc, pointd)
    drawPolygon(ctx, TABLE_COLOR[3], pointa, pointb, pointb_be, pointa_be)
}

function drawSphere(ctx,centre,rad){
// console.log(centre.x,centre.y,centre.z,rad)
    let sidePoint=new Point3D(centre.x-rad,centre.y,centre.z)

    let c=project(centre)
    let sideProj=project(sidePoint)
    //draw circle

    let displayRadius=distance(c,sidePoint)
    drawCircle(ctx,c,8);
}
