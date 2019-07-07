
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    load_scene1(){
        cc.director.loadScene('main01');
    },
    load_scene2(){
        cc.director.loadScene('start');
    },
    load_scene3(){
        cc.director.loadScene('synopsis');
    },

    start () {
        
    },

    // update (dt) {},
});
