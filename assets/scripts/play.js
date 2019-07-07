
window.Global = {
    hp:10,
};

cc.Class({
    extends: cc.Component,

    properties: {
        rate:cc.v2(400,200),
        camera:cc.Node,
        head:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.dir = {x:0,y:0};
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.key_down, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.key_up, this);
        
    },

    onEnable: function () {
        cc.director.getCollisionManager().enabled = true;
        
    },

    key_down(e){
        switch(e.keyCode){
            case cc.macro.KEY.a:
            // cc.log('a');
            this.dir.x = -1;
            this.node.scaleX = -1;
            break;
            case cc.macro.KEY.d:
            this.dir.x = 1;
            this.node.scaleX = 1;
            break;
            case cc.macro.KEY.w:
            this.dir.y = 1;
            this.node.scaleX = 1;
            break;
            case cc.macro.KEY.s:
            this.dir.y = -1;
            this.node.scaleX = 1;
            break;
        }
    },

    key_up(e){
        switch(e.keyCode){
            case cc.macro.KEY.a:
            case cc.macro.KEY.d:
            this.dir.x = 0;
            break;
            case cc.macro.KEY.w:
            case cc.macro.KEY.s:
            this.dir.y = 0;
            break;
        }
    },

    onCollisionEnter(other){
        var procon = this.node.getComponent('proControl');

        cc.log(other.node.group);
        if(other.node.group == 'bullet'){
            cc.log(other.node.group);
            Global.hp -= 1;
            procon.pro_control_reduce();
            cc.log(Global.hp);
        }
    },

    update (dt) {
        this.camera.x = this.node.x + 440;
        this.head.x += this.dir.x * dt * this.rate.x;
        this.node.x += this.dir.x * dt * this.rate.x;
        this.node.y += this.dir.y * dt * this.rate.y;
    },
});
