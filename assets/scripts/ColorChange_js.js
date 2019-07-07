import colors from 'colors'

cc.Class({
    extends: cc.Component,

    properties: {
       random:true,
       time:2,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.i = 0;
        this.schedule(function() {
            // 这里的 this 指向 component
            if(this.random){
            this.random_colorchange();
            
        }
        else{
            this.not_random_colorchange();
           
    }},this.time);
    },

    not_random_colorchange(){
        this.node.color = colors[this.i];
        
        this.i++;
        if(this.i == 3){
            this.i = 0;
        }
        
    },

    random_colorchange(){
        let index = colors[Math.floor(Math.random() * colors.length)];
        this.node.color = index;
        // cc.log(index);
        //cc.log(this.node.color);
    },
    // update (dt) {},
});
