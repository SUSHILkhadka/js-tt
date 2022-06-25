const CANVAS_WIDTH=1200;
const CANVAS_HEIGHT=600;

const translateX=500;
const translateY=300;   
const translateX2=500;
const translateY2=300;   


const nomouse=9000;
// rotation_angle=-87.99999999999245;
START_ZPLANE=1.5
rotation_angle=-0;
rotation_anglex=45;

const RESTRICTION_START_ZPLANE_min= 1
const RESTRICTION_START_ZPLANE_max= 4
const RESTRICTION_ANGLE_Y= 50
const RESTRICTION_ANGLE_X= 90

const KeyboardMovement=10;
const increment=0.01

//world
const GROUND_START_x=-1.4
const GROUND_START_y=0.3
const GROUND_START_z=1

const GROUND_WIDTH=3
const GROUND_LENGTH=5

const WALL_HEIGHT=1.6;



//board
const BOARD_WIDTH=0.4
const BOARD_HEIGHT=0.1
const BOARD_LENGTH=0.8

const START_BOARD_x=0;
const START_BOARD_y=0;
const START_BOARD_z=1 ;

//leg
const LEG_WIDTH_OFFSET=0.05
const LEG_HEIGHT=GROUND_START_y-(START_BOARD_y+BOARD_HEIGHT)
const LEG_LENGTH_OFFSET=0.05;

const START_LEG_x=START_BOARD_x+LEG_WIDTH_OFFSET
const START_LEG_y=START_BOARD_y+BOARD_HEIGHT
const START_LEG_z=START_BOARD_z+LEG_LENGTH_OFFSET

const LEG_WIDTH=BOARD_WIDTH-2*LEG_WIDTH_OFFSET;
const LEG_LENGTH=BOARD_LENGTH-2*LEG_LENGTH_OFFSET;




const START_LEG_xr=START_BOARD_x+BOARD_WIDTH-10

//net
const MID_LINE_WIDTH=0.01

const NET_WIDHT=BOARD_WIDTH+0.05
const NET_HEIGHT=0.07
const START_NET_x=START_BOARD_x-(NET_WIDHT-BOARD_WIDTH)/2
const START_NET_y=START_BOARD_y-NET_HEIGHT
const START_NET_z=START_BOARD_z+(BOARD_LENGTH/2)

const TABLE_COLOR=["rgba(31, 199, 31, 01)","rgb(0, 0, 102)","rgba(124, 69, 73, 0.8)","rgba(0, 0, 255, 1)"]
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

BALL_COLOR=["rgba(255, 177, 0, 0.8)","rgb(230, 138, 0,1)"]

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





//strike back constants
const RESPONSE_SCALE_ZtoX=0.5;
const RESPONSE_SCALE_Z=0.00001;
const RESPONSE_SCALE_X=0.000001;

const STABLE_Y_VELOCITY=-0.01;

