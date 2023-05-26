var RoleJs = require("Role");

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
    },
    onCollisionEnter : function (other, self) {
        if(other.node.group == "敵人")
        {
            other.node.color = cc.Color.RED
            if(self.node.name == "大招攻擊範圍") return;
            self.node.parent.getComponent(RoleJs).Sp += 20
            if(self.node.parent.getComponent(RoleJs).Sp > 100) self.node.parent.getComponent(RoleJs).Sp = 100
            self.node.parent.getComponent(RoleJs).SpProgressBar();
        }
    },

    onCollisionExit: function (other, self) {
        if(other.node.group == "敵人")
        {
            console.log("打到了")
            other.node.color = cc.Color.WHITE
        }
    },
    // update (dt) {},
});
