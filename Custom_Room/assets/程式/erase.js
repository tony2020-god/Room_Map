var gameModel = require("Model");

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    eraser(){
      if(gameModel.MouseType == "eraser") this.node.destroy()
    }
    // update (dt) {},
});
