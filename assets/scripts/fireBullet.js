
cc.Class({
    extends: cc.Component,

    properties: {
        bullet:cc.Prefab,
        bulletBox:cc.Node,
        random:true,
        bulletNumber:5,
        fire_speed:3,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.schedule(function() {
            this.fire_bullet(this.bulletNumber);
        },this.fire_speed)
        
        
        
    },
//生成子弹
    fire_bullet(number){
        if(this.random){
            for(var i = 0;i < number;i++){
                this.instant_bullet(this.random_math(),this.random_math());
            }
            
        }else{
            // this.instant_bullet(0,600);
            this.instant_bullet(600,600);
            this.instant_bullet(600,0);
            this.instant_bullet(600,-600);
            this.instant_bullet(-600,0);
            this.instant_bullet(-600,-600);
            this.instant_bullet(-600,0);
            this.instant_bullet(-600,600);
        }
        
        
    },

    instant_bullet(posX,posY){
        var bullet = cc.instantiate(this.bullet);
                    bullet.parent = cc.find('Canvas/bulletBox');
                    bullet.x = this.node.x + this.node.parent.x;
                    bullet.y = this.node.y;
                    bullet.color = this.node.color;
                    var bullet_des = cc.callFunc(function() {
                    this.bulletBox.removeAllChildren(); 
                }.bind(this))
                var time_delay = cc.delayTime(0.5);
                var move_dir = cc.moveBy(2,cc.v2(posX,posY)).easing(cc.easeCubicActionOut());
                bullet.runAction(cc.sequence(move_dir,time_delay,bullet_des));
    },

    random_math(){
        var ran = (Math.random() - 0.5) * 600;
        return(ran);
    },
    // update (dt) {},
});
