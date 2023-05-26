
cc.Class({
    extends: cc.Component,

    properties: {
        Player:{
            default : null,
            type:cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        let player_pos = this.Player.convertToWorldSpaceAR(cc.v2(0,0))
        let camara_pos = this.node.parent.convertToNodeSpaceAR(player_pos)
        this.node.position = camara_pos;
    },
});
