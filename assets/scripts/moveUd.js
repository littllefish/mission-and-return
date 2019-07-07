

cc.Class({
    extends: cc.Component,

    properties: {
        time_delay:1,
        distance:200,
        speed:2,
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.node.runAction(this.move_action());
    },

    move_action(){
        var move_up = cc.moveBy(this.speed,cc.v2(0,this.distance)).easing(cc.easeCubicActionOut());
        var move_dowm = cc.moveBy(this.speed,cc.v2(0,-this.distance)).easing(cc.easeCubicActionOut());
        var time_delay = cc.delayTime(this.time_delay);
        return (cc.repeatForever(cc.sequence(move_dowm,time_delay,move_up,time_delay)));
    }
    // update (dt) {},
});
