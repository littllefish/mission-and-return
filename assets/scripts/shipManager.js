import colors from 'colors'
cc.Class({
    extends: cc.Component,

    properties: {
        speed:8,
        distance:400,
        time:2,
        circle_distance:300,
        rubbish:cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS: 

    // onLoad () {},

    start () {
        this.node.getComponent(cc.Animation).play('move');
        this.scheduleOnce(function() {
            this.node.destroy();
        },12)
        this.schedule(function() {
            this.rubbish_action();
        },this.time)

    },
    ship_action(){
        var move_cricle = cc.moveBy(this.speed,cc.v2(this.circle_distance,0)).easing(cc.easeCircleActionIn());
        var move_right = cc.moveBy(this.speed,cc.v2(this.distance,0));
        return(cc.sequence(move_right,move_cricle,move_right));
    },
    rubbish_action(){
        var rubbish = cc.instantiate(this.rubbish);
        rubbish.parent = cc.find('Canvas/background03');
        rubbish.x = this.node.x;
        rubbish.y = this.node.y;
        let index = colors[Math.floor(Math.random() * colors.length)];
        rubbish.color = index;
        var move_down = cc.moveBy(2,cc.v2(0,-700));
        var destroy_rubbish = cc.callFunc(function() {
            rubbish.destroy();
        }.bind(this));
        rubbish.runAction(cc.sequence(move_down,destroy_rubbish));
    },
    // update (dt) {},
});
