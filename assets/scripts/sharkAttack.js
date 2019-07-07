

cc.Class({
    extends: cc.Component,

    properties: {
        player:cc.Node,
        move_time:2,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        var box = this.node.getComponents(cc.BoxCollider);

    },

    shark_attach(){
        var playerPosition = this.player.getPosition();
        var time = cc.delayTime(3);
        var des = cc.callFunc(() => {
            this.node.destroy();
        });
        var move = cc.moveTo(this.move_time,cc.v2(playerPosition.x,playerPosition.y));
        return(this.node.runAction(cc.sequence(move,time,des)));
    },

    onCollisionEnter(other,self){
        if(self.tag == '0'){
            var procon = this.player.getComponent('proControl');
            procon.col_control(-1);
            cc.log('1');
        }
        else if(self.tag == '1'){
            
            this.shark_attach();
            cc.log('0');
        }
    },
    // update (dt) {},
});
