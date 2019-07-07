

cc.Class({
    extends: cc.Component,

    properties: {
        block:{
            type:cc.Node,
            default:[],
        },
        delay_time:2,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.sel = 0;
        this.schedule(function() {
            this.show_block(this.sel);
            this.sel += 1;
            if(this.sel == this.block.length){
                this.sel = 0;
            }
        },this.delay_time)
    },

    show_block(j){
        for(var i = 0;i < this.block.length;i++){
            this.block[i].active = false;
        }
        this.block[j].active = true;
    },
    // update (dt) {},
});
