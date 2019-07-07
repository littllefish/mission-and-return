
cc.Class({
    extends: cc.Component,

    properties: {
        n:cc.Node,
    },

    
    
    
    start () {
        
        var anim = this.n.getComponent(cc.Animation);
        anim.play('haitun_move');
        var animState = anim.play('haitun_move');
        animState.wrapMode = cc.WrapMode.Loop;
           cc.director.preloadScene('main01');
        this.scheduleOnce(function(){
            cc.director.loadScene('main01');
            cc.log('1');
        },4)
        
    },

    // update (dt) {},
});
