window.Global = {
    hp: 10,
    sa: 10,
};
cc.Class({
    extends: cc.Component,

    properties: {
        speed: cc.v2(0, 0),
        maxSpeed: cc.v2(1000, 1000),
        gravity: -1000,
        drag: 1000,
        direction: 0,
        jumpSpeed: 300,
        camera:cc.Node,
        headImage:cc.Node,
        ship:cc.Node,
        successBox:cc.Node,
        jump_audio:{
            type:cc.AudioClip,
            default:null,
        },
        score_audio:{
            type:cc.AudioClip,
            default:null,
        },
    },

    // use this for initialization
    onLoad: function () {
       this.por = this.node.getComponent('proControl');
        this.ship.active = false;
        //add keyboard input listener to call turnLeft and turnRight
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyPressed, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyReleased, this);

        this.collisionX = 0;
        this.collisionY = 0;

        this.prePosition = cc.v2();
        this.preStep = cc.v2();

        
    },

    onEnable: function () {
        cc.director.getCollisionManager().enabled = true;
        
    },

    onDisable: function () {
        cc.director.getCollisionManager().enabled = false;
        
    },
    
    onKeyPressed: function (event) {
        let keyCode = event.keyCode;
        switch(keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this.direction = -1;
                this.node.scaleX = -1;
                this.node.getComponent(cc.Animation).play('haitun_move');
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.direction = 1;
                this.node.scaleX = 1;
                this.node.getComponent(cc.Animation).play('haitun_move');
                break;
            case cc.macro.KEY.j:
            case cc.macro.KEY.up:
            
                if (!this.jumping) {
                    this.jumping = true;
                    this.speed.y = this.jumpSpeed;
                    this.node.getComponent(cc.Animation).play('jump');   
                    cc.audioEngine.playEffect(this.jump_audio,false) ;
                    cc.audioEngine.setEffectsVolume(1);
                }
                break;
        }
    },
    
    onKeyReleased: function (event) {
        let keyCode = event.keyCode;
        switch(keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.direction = 0;
                break;
            
        }
    },
    start () {
        this.schedule(function () {
            this.por.por_control(-0.02);
            
        }, 0.1);
        
    },
    onCollisionEnter: function (other, self) {
        
        if(!this.node.color.equals(other.node.color) && other.node.group != 'star' && other.node.group != 'shark'){
            cc.log('not same');
            this.por.col_control(-1);
        }
        switch(other.node.group){
            case 'ground':
            case 'groundud':
                if(other.node.name == 'yingle'){
                    this.successBox.active = true;
                    this.successBox.setPosition(this.camera.x, 700);
                    var move_down = cc.moveBy(1,cc.v2(0,-700)).easing(cc.easeCubicActionIn());
                    this.successBox.runAction(move_down);
                    this.node.destroy();
                    
                }
                var fade = cc.fadeIn(1);
                if (other.node.name == 'groundlf-textshow') {
                    var node = cc.find('Canvas/background11/New Label');
                    node.runAction(fade);
                }
                
            // if(other.node.name == 'move_block'){
                
            //     this.node.y = other.node.y + this.node.height / 2;
            // }
                    // 1st step 
        // get pre aabb, go back before collision
        var otherAabb = other.world.aabb;
        var otherPreAabb = other.world.preAabb.clone();

        var selfAabb = self.world.aabb;
        var selfPreAabb = self.world.preAabb.clone();

        // 2nd step
        // forward x-axis, check whether collision on x-axis
        selfPreAabb.x = selfAabb.x;
        otherPreAabb.x = otherAabb.x;

        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
            if (this.speed.x < 0 && (selfPreAabb.xMax > otherPreAabb.xMax) && (otherPreAabb.yMax > selfPreAabb.yMax)) {
                this.node.x = otherPreAabb.xMax - this.node.parent.x + selfPreAabb.width / 2;
                this.collisionX = -1;
            }
            else if (this.speed.x > 0 && (selfPreAabb.xMin < otherPreAabb.xMin) && (otherPreAabb.yMax > selfPreAabb.yMax)) {
                this.node.x = otherPreAabb.xMin - this.node.parent.x - selfPreAabb.width / 2;
                this.collisionX = 1;
            }

            this.speed.x = 0;
            other.touchingX = true;
            return;
        }

        // 3rd step
        // forward y-axis, check whether collision on y-axis
        selfPreAabb.y = selfAabb.y;
        otherPreAabb.y = otherAabb.y;

        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
            if (this.speed.y < 0 && (selfPreAabb.yMax > otherPreAabb.yMax)) {
                this.node.y = otherPreAabb.yMax - this.node.parent.y + selfPreAabb.height / 2 - 1;
                this.jumping = false;
                this.collisionY = -1;
            }
            else if (this.speed.y > 0 && (selfPreAabb.yMin < otherPreAabb.yMin)) {
                this.node.y = otherPreAabb.yMin - this.node.parent.y - selfPreAabb.height / 2 - 1;
                this.collisionY = 1;
            }
            
            this.speed.y = 0;
            other.touchingY = true;
        } break;

        case 'bullet':
        // var procon = this.node.getComponent('proControl');
        // Global.hp -= 1;
        // procon.pro_control_reduce();
            other.node.destroy();

        break;
        case 'background':
        cc.log('t');
            if(other.node.name == 'background05w'){
                this.ship.active = true;
                cc.log('true');
            }
            

        break;
        case 'star':
        this.node.color = other.node.color;
        other.node.destroy();

        break;
            case 'rubbish':
                
                    other.node.destroy();
                    Global.sa += 1;
                
                    cc.audioEngine.playEffect(this.score_audio, false);
                    cc.audioEngine.setEffectsVolume(0.3);
                break;
            

                


        }
        
        
        
        

        
    },
        
    onCollisionStay: function (other, self) {
        
        if(other.node.group == 'ground' && this.speed.y == 0){
            this.jumping = false;
        }
        if (other.node.group === 'groundud') {
            this.jumping = false;
            this.node.y = other.node.y + this.node.height  / 2 + 15;
        }
        // if (other.node.name == 'daodan') {
        //     this.jumping = false;
        //     this.node.y = other.node.y + this.node.height  / 2 - 10;
        // }
        if (this.collisionY === -1) {
            

            // this.node.y = other.world.aabb.yMax;

            // var offset = cc.v2(other.world.aabb.x - other.world.preAabb.x, 0);
            
            // var temp = cc.affineTransformClone(self.world.transform);
            // temp.tx = temp.ty = 0;
            
            // offset = cc.pointApplyAffineTransform(offset, temp);
            // this.node.x += offset.x;
        }
    },
    

    onCollisionExit: function (other) {
        // if(other.node.name == 'daodan'){
            
        //     this.node.y = other.node.y + this.node.height - 10;
        // }
        

        if (other.touchingX ) {
            this.collisionX = 0;
            other.touchingX = false;
            
        }
        else if (other.touchingY) {
            other.touchingY = false;
            this.collisionY = 0;
            this.jumping = true;
        }
    },
    
    update: function (dt) {
        this.camera.x = this.node.x + 450;
        if (this.collisionY === 0 && this.node.y > -220) {
            this.speed.y += this.gravity * dt;
            
            if (Math.abs(this.speed.y) > this.maxSpeed.y) {
                this.speed.y = this.speed.y > 0 ? this.maxSpeed.y : -this.maxSpeed.y;
            }
        }

        if (this.direction === 0) {
            this.speed.x = 0;
            // if (this.speed.x > 0) {
            //     this.speed.x -= this.drag * dt;
            //     if (this.speed.x <= 0) this.speed.x = 0;
            // }
            // else if (this.speed.x < 0) {
            //     this.speed.x += this.drag * dt;
            //     if (this.speed.x >= 0) this.speed.x = 0;
            // }
        }
        else {
            this.speed.x += (this.direction > 0 ? 1 : -1) * this.drag * dt;
            if (Math.abs(this.speed.x) > this.maxSpeed.x) {
                this.speed.x = this.speed.x > 0 ? this.maxSpeed.x : -this.maxSpeed.x;
            }
        }

        if (this.speed.x * this.collisionX > 0) {
            this.speed.x = 0;
        }
        
        this.prePosition.x = this.node.x;
        this.prePosition.y = this.node.y;

        this.preStep.x = this.speed.x * dt;
        this.preStep.y = this.speed.y * dt;
        this.headImage.x += this.speed.x *dt;
        this.node.x += this.speed.x * dt;
        this.node.y += this.speed.y * dt;
    },
});
