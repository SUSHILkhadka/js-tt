const CANVAS_WIDTH=1200;
const CANVAS_HEIGHT=600;

const translateX=500;
const translateY=300;   
const translateX2=500;
const translateY2=300;   


const nomouse=9000;
// rotation_angle=-87.99999999999245;
rotation_angle=-4;
rotation_anglex=7.669999999999859;
rotation_anglex=90;

const increment=0.005
//board
const BOARD_WIDTH=0.3
const BOARD_HEIGHT=0.1
const BOARD_LENGTH=0.8

const START_BOARD_x=0;
const START_BOARD_y=0;
const START_BOARD_z=1 ;

//leg
const LEG_WIDTH=20
const LEG_HEIGHT=100
const START_LEG_x=START_BOARD_x+10
const START_LEG_y=START_BOARD_y+BOARD_HEIGHT
const START_LEG_z=START_BOARD_z+10

const START_LEG_xr=START_BOARD_x+BOARD_WIDTH-10

//net
const NET_WIDHT=BOARD_WIDTH+0.1
const NET_HEIGHT=0.05
const START_NET_x=START_BOARD_x-(NET_WIDHT-BOARD_WIDTH)/2
const START_NET_y=START_BOARD_y-NET_HEIGHT
const START_NET_z=START_BOARD_z+(BOARD_LENGTH/2)

const TABLE_COLOR=["rgba(31, 199, 31, 0.4)","transparent","transparent","rgba(124, 69, 73, 0.8)","rgba(255, 177, 0, 0.8)"]
//bat
const BAT_WIDTH=0.05
const BAT_HEIGHT=0.1
const BAT_LENGTH=1

const BAT_WIDTH_2d=80
const BAT_HEIGHT_2d=70
const BAT_LENGTH_2d=1

//ball
const BALL_RADIUS_2D=20
const BALL_RADIUS=5

BALL_COLOR=["rgba(255, 177, 0, 0.8)"]

const GRAVITY=0.0009
// const GRAVITY=0.0

const FLOORSTART_Y=800
const LOSS_TABLE=0.00
const LOSS_GROUND=0.01

const timeScale=0.7

const thresholdVelocityY=0.00000001

const STARTING_BALL_POSITION_Y=-0.1
const STARTING_BALL_VELOCITY_Y=0.001
const STARTING_BALL_VELOCITY_X=-0.0

const thresholdX=0.01;
const thresholdY=0.01;
const thresholdZ=0.3;

const GROUND_START_x=-1
const GROUND_START_y=1
const GROUND_START_z=1

const GROUND_WIDTH=2.5
const GROUND_LENGTH=10

const WALL_HEIGHT=2;



//strike back constants
const RESPONSE_SCALE_ZtoX=0.5;
const RESPONSE_SCALE_Z=0.00001;
const RESPONSE_SCALE_X=0.000001;

const STABLE_Y_VELOCITY=-0.01;

