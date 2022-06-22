const CANVAS_WIDTH=window.innerWidth;
const CANVAS_HEIGHT=800;

const translateX=400;
const translateY=500;

// rotation_angle=-87.99999999999245;
rotation_angle=-4;

rotation_anglex=7.669999999999859;
// rotation_angle=0
// rotation_anglex=0

const increment=0.005
//board
const BOARD_WIDTH=0.3
const BOARD_HEIGHT=0.1
const BOARD_LENGTH=2
// START_BOARD_x=20;
// START_BOARD_y=20;
// START_BOARD_z=20;
const START_BOARD_x=0;
const START_BOARD_y=0;
const START_BOARD_z=1 ;


const LEG_WIDTH=20
const LEG_HEIGHT=100
const START_LEG_x=START_BOARD_x+10
const START_LEG_y=START_BOARD_y+BOARD_HEIGHT
const START_LEG_z=START_BOARD_z+10

const START_LEG_xr=START_BOARD_x+BOARD_WIDTH-10


const NET_WIDHT=BOARD_WIDTH+10
const NET_HEIGHT=20
const START_NET_x=START_BOARD_x+(NET_WIDHT-BOARD_WIDTH)/2
const START_NET_y=START_BOARD_y-NET_HEIGHT
const START_NET_z=START_BOARD_z+(BOARD_LENGTH/2)

const TABLE_COLOR=["green","transparent","transparent","brown"]
//bat
const BAT_WIDTH=2
const BAT_HEIGHT=20
const BAT_LENGTH=1
const BAT_WIDTH_2d=80
const BAT_HEIGHT_2d=70
const BAT_LENGTH_2d=1

//ball
const BALL_RADIUS=5

const GRAVITY=0.0009

const FLOORSTART_Y=800
const LOSS=0

const timeScale=0.2

