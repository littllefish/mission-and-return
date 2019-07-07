
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.node.opacity = 0;
    },

    onCollisionEnter(other){
        cc.log('b');
        if(other.node.group == 'player'){
            cc.log('a');
            this.node.opacity = 255;
        }
    },
    // update (dt) {},
});
