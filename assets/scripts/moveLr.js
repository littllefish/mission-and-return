
cc.Class({
    extends: cc.Component,

    properties: {
        moveTime:2,
        moveDis:300,
        timeDelay:2,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.node.runAction(this.move_left_right());
    },

    move_left_right(){
        var move_left = cc.moveBy(this.moveTime,cc.v2(-this.moveDis,0));
        var move_right = cc.moveBy(this.moveTime,cc.v2(this.moveDis,0));
        var time_delay = cc.delayTime(this.timeDelay);
        return (cc.repeatForever(cc.sequence(move_right,time_delay,move_left,time_delay)));
    },
    // update (dt) {},
});
