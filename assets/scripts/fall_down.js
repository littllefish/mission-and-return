
cc.Class({
    extends: cc.Component,

    properties: {
        tip:cc.Node,
        bg:cc.Node,
        tipText:cc.Node,
        player:cc.Node,
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.root = false;
        this.scheduleOnce(function() {
            this.root = true;
        },1)
        this.allow = true;
        this.scheduleOnce(function() {
            if(this.root){
                cc.log(1);
                this.bg.on('touchstart', (event) => {
                    this.touch_start();
                });
            }
        },1.5)
        
       
        this.scheduleOnce(function(){
            this.move_down(true);
        },1)
    },

    touch_start(){
        this.move_down(false);
        
    },

    move_down(allow){
        var fade1 = cc.fadeIn(1);
        var fade2 = cc.fadeOut(1);
        if(allow){
            var down = cc.moveBy(0.5,cc.v2(0,-500)).easing(cc.easeCubicActionIn());
            this.bg.opacity = 30;
            cc.find('Canvas/player').active = false;
            this.tipText.runAction(cc.repeatForever(cc.sequence(fade1,fade2)));
            
        }
        else{
            var down = cc.moveBy(1,cc.v2(0,500)).easing(cc.easeCubicActionOut());
            this.bg.opacity = 255;
            this.tipText.destroy();
            cc.find('Canvas/player').active = true;
            
        }
        this.tip.runAction(down);
        
    },

    
    update (dt) {
        
        
    },
});
