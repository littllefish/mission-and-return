
cc.Class({
    extends: cc.Component,

    properties: {
        bg_text:{
            type:cc.Node,
            default:[],
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.show_text();
        this.scheduleOnce(function() {
            cc.find('Canvas/TextAll').removeAllChildren();
        },(this.bg_text.length + 1) * 2);
    },
    
    show_text(){
        var i = 0;
        var callback = function(){
            if(i == this.bg_text.length - 1){
                this.unschedule(callback);
            }
            this.fadeIn_action(this.bg_text[i]); 
            i ++;
        }
        this.schedule(callback,2);
        
    },

    fadeIn_action(node){
        var fadein = cc.fadeIn(2);
        return (node.runAction(fadein));
    },
    update (dt) {
        
    },
});
