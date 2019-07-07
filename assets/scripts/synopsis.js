
cc.Class({
    extends: cc.Component,

    properties: {
        bg:cc.Node,
        text:cc.Node,
        synopsis:{
            type:cc.Node,
            default:[],
            
        },
    },



    start () {
        this.i = 0;
        var fadein = cc.fadeIn(1);
        var fadeout = cc.fadeOut(1);
        this.text.runAction(cc.repeatForever(cc.sequence(fadein,fadeout)));
        this.bg.on('touchstart', (event) => {
            this.touch_start();
        });
    this.show_text();
    this.scheduleOnce(function() {
        cc.find('Canvas/New Node').removeAllChildren();
    },(this.synopsis.length + 1) * 2);
    
    this.scheduleOnce(function() {
        cc.director.loadScene('reload')
    },(this.synopsis.length + 1) * 2+2);

    },
    touch_start(event){
        this.i += 1;
        if(this.i == 2){
            cc.director.loadScene('reload');
        }
    },
    show_text(){
        var i = 0;
        var callback = function(){
            if(i == this.synopsis.length - 1){
                this.unschedule(callback);
            }
            this.fadeIn_action(this.synopsis[i]); 
            i ++;
        }
        this.schedule(callback,2);
        
    },

    fadeIn_action(node){
        var fadein = cc.fadeIn(2);
        return (node.runAction(fadein));
    },
    
});
