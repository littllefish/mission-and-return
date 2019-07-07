

cc.Class({
    extends: cc.Component,

    properties: {
       daodan:cc.Prefab,
       launchTime:2,
       delayTime:3,
       heng:true,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.schedule(function() {
            this.instantDaodan();
            
        },this.delayTime);
        

    },

    instantDaodan(){
        var daodan = cc.instantiate(this.daodan);
        daodan.parent = cc.find('Canvas/background16');
        
        daodan.x = this.node.x;
        daodan.y = this.node.y;
        
        daodan.color = this.node.color;
        var left_move = this.heng ? cc.moveBy(this.launchTime,cc.v2(-600,0)) :cc.moveBy(this.launchTime,cc.v2(0,-450)) ;
        var desDaodan = cc.callFunc(() => {
            daodan.destroy();
        });
        daodan.runAction(cc.sequence(left_move,desDaodan));
    },
    
    
    // update (dt) {},
});
