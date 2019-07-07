

cc.Class({
    extends: cc.Component,

    properties: {
        move_dir:300,
        overturn:true,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.scheduleOnce(function(){
            this.node.runAction(this.move_updown(this.overturn));
        },1);
    },
    move_updown(overturn){
      var move_up = cc.moveBy(2,cc.v2(0,this.move_dir));
      var move_down = cc.moveBy(2,cc.v2(0,-this.move_dir));
      var move_up_out = cc.moveBy(2,cc.v2(0,this.move_dir)).easing(cc.easeCubicActionOut());
      var move_down_in = cc.moveBy(2,cc.v2(0,-this.move_dir)).easing(cc.easeCubicActionOut());
      var timeDely = cc.delayTime(2);
      var rotate180 = cc.rotateBy(0.1,180);
      if(overturn){
        return (cc.repeatForever(cc.sequence(move_up_out,rotate180,move_down_in,rotate180)));
      }else{
        return (cc.repeatForever(cc.sequence(move_up,timeDely,move_down,timeDely)));  
      }
      
    },
    // update (dt) {},
});
