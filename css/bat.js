class Bat {
    constructor(point,width,height,length=1, angle) {
        this.point = point;
        this.width=width;
        this.height=height;
        this.length=length; // Optional. Valid only if bat is 3D.
        this.angle = angle;
    }

    drawBat() {

        //From this.point,width,height get 4 points top left right bottom.
        //Proplerly project this in viewplane, based on viewpoint.


    }

    //in game.js there will be 2 bats, first one's "this.point" controlled with mouse, other "this.point" controlled with WASD.
    //for multiplayer. Either change viewpoint and viewplane.Difficult one.

}