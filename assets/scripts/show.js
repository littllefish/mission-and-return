// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html

cc.Class({
    extends: cc.Component,

    properties: {
        tipLabel:cc.Node,
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    onCollisionEnter(other){
        if(other.node.group == 'player'){
            
            var fadein = cc.fadeIn(1.6);
            var fadeout = cc.fadeOut(3);
            var des = cc.callFunc(function() {
                this.tipLabel.destroy();
            }.bind(this));
            this.tipLabel.runAction(cc.sequence(fadein,fadeout,des));

        }
    },

    

    // update (dt) {},
});
