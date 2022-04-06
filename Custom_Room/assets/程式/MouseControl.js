var gameModel = require("Model");

cc.Class({
    extends: cc.Component,

    properties: {
        items:{
            default : null,
            type:cc.Prefab
        },

        items_parent:{
            default : null,
            type:cc.Node
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        this.status = "不能放置物件"
    },

    start () {
       this.CoverObjectCount = 0; 
    },


    onCollisionEnter : function (other, self) {
        this.CoverObjectCount ++
        self.Size = self.node.Size
        if(gameModel.MouseType == "object")
        {
                this.node.color = cc.Color.RED
                this.status = "不能放置物件"
        }
        else
        {
                if(other.node.group == "玩家"|| other.node.group == "牆壁") return;
                self.Size = self.node.Size
                this.node.color = cc.Color.GREEN
        }
    },

    onCollisionExit: function (other, self) {
        this.CoverObjectCount --
        if(this.CoverObjectCount < 0) this.CoverObjectCount = 0
        if(this.CoverObjectCount != 0) return
        this.node.color = cc.Color.WHITE
        if(gameModel.MouseType != "object") return;
        this.status = "可以放置物件"
    },

    NowData(ObjectData){
        this.ObjectData = ObjectData;
        console.log(this.node.group)
    },

    SpawnObject(){
        if(this.status == "不能放置物件" || gameModel.MouseType == "eraser") return
        var scene = cc.director.getScene()
        var node = cc.instantiate(this.items);
        node.parent = scene;
        node.getComponent(cc.Sprite).spriteFrame = this.node.getComponent(cc.Sprite).spriteFrame
        node.getComponent(cc.BoxCollider).size = this.node.getComponent(cc.BoxCollider).size
        node.getComponent(cc.PhysicsBoxCollider).size = node.getComponent(cc.BoxCollider).size
        node.group = this.ObjectData.tag;
        node.setPosition(this.node.x , this.node.y)
        node.active = false
        node.active = true
        console.log(node.getComponent(cc.PhysicsBoxCollider).size,this.node.getComponent(cc.BoxCollider).size)
        node.parent = this.items_parent
    },

    // update (dt) {},
});
