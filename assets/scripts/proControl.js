
cc.Class({
    extends: cc.Component,

    properties: {
      bar:cc.Node,
      col_bar:cc.Node,
      failText:cc.Node,
      camera:cc.Node,
      bar2:cc.Node,
      pro_bar:cc.Node,
      death_audio:{
          type:cc.AudioClip,
          default:null,
      },
      bgm:{
          type:cc.AudioClip,
          default:null,
      },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    col_control(num) {
        Global.hp += num;
        this.por1 = this.bar.getComponent(cc.ProgressBar);
    this.por1.progress = 0.1 * Global.hp;
    if (this.por1.progress > 0.6) {
        this.col_bar.color = cc.color(126, 214, 223);
    }
    if(this.por1.progress < 0.6){
        this.col_bar.color = cc.color(253,203,110);
    } 
    if(this.por1.progress < 0.3){
        this.col_bar.color = cc.color(244,67,54);
    }
    if(this.por1.progress == 0){
        
        this.failText.active = true;
        this.failText.setPosition(this.camera.x,700);
        this.failText.runAction(this.fail_move());
        cc.audioEngine.playEffect(this.death_audio,false);
        this.node.destroy();
    }
    if (this.node.y < -300) {
        
        
        this.failText.active = true;
        this.failText.setPosition(this.camera.x, 700);
        this.failText.runAction(this.fail_move());
        cc.audioEngine.stopMusic(this.bgm,false);
        cc.audioEngine.playEffect(this.death_audio,false);
        this.node.destroy();
    }
    },


    por_control(num) {
        
        Global.sa += num;
        this.por2 = this.bar2.getComponent(cc.ProgressBar);
        this.por2.progress = 0.1 * Global.sa;
        if (this.por2.progress > 1) {
            this.por2.progress = 1;
        }
        if(Global.sa > 10){
            Global.sa = 10;
        }
        if (this.por2.progress > 0.6) {
            this.pro_bar.color = cc.color(255, 120, 0);
        }
        if (this.por2.progress < 0.6) {
            this.pro_bar.color = cc.color(253, 203, 110);
        }
        if (this.por2.progress < 0.3) {
            this.pro_bar.color = cc.color(244, 67, 54);
        }
        if (this.por2.progress <= 0) {
            
            
            this.failText.active = true;
            this.failText.setPosition(this.camera.x, 700);
            this.failText.runAction(this.fail_move());
            cc.audioEngine.playEffect(this.death_audio,false);
            this.node.destroy();
        }
        if (this.node.y < -300) {
            
            
            this.failText.active = true;
            this.failText.setPosition(this.camera.x, 700);
            this.failText.runAction(this.fail_move());
            cc.audioEngine.stopMusic(this.bgm,false);
            cc.audioEngine.playEffect(this.death_audio,false);
            this.node.destroy();
        }
    },
    
    fail_move(){
        var move_down = cc.moveBy(1,cc.v2(0,-700)).easing(cc.easeCubicActionIn());
        return (move_down);
    },
    
    start () {
        this.por1 = this.bar.getComponent(cc.ProgressBar);
        this.por2 = this.bar2.getComponent(cc.ProgressBar);
        this.por1.progress = 1;
        this.por2.progress = 1;
        Global.hp = 10;
        Global.sa = 10;
        cc.audioEngine.playMusic(this.bgm,true);
    },

    // update (dt) {},
});
