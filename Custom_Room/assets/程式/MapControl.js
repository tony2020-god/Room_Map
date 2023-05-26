var gameModel = require("Model");

cc.Class({
    extends: cc.Component,

    properties: {
        tiledMap :{
            default : null,
            type:cc.TiledMap
         },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().debugDrawFlags = true;
    },

    start () {
        this.GiveWallLayer();
        this.SetRoadPos();
    },

    GiveWallLayer(){
        var tiledSize = this.tiledMap.getTileSize(); //取得每整塊地圖大小
        var layer = this.tiledMap.getLayer("牆壁"); //取得牆壁圖層
        var layerSize = layer.getLayerSize(); //取得牆壁圖層大小

        for(var i = 0; i < layerSize.width; i++)
        {
            for(var j = 0; j < layerSize.height; j++)
            {
               var tiled = layer.getTiledTileAt(i ,j, true) //取得牆壁圖層內每一塊瓦片
               if(tiled.gid != 0) //如果瓦片存在
               {
                  tiled.node.group = "牆壁"
                  let body = tiled.node.addComponent(cc.RigidBody);
                  body.type = cc.RigidBodyType.Static;
                  let PyCollider = tiled.node.addComponent(cc.PhysicsBoxCollider)
                  PyCollider.offset = cc.v2(tiledSize.width / 2, tiledSize.height / 2)
                  PyCollider.size = tiledSize;
                  PyCollider.apply();
               }
            }
        }
    },

    SetRoadPos(){
        var tiledSize = this.tiledMap.getTileSize(); //取得每整塊地圖大小
        var layer = this.tiledMap.getLayer("走道"); //取得走道圖層
        var layerSize = layer.getLayerSize(); //取得走道圖層大小

        for(var i = 0; i < layerSize.width; i++)
        {
            for(var j = 0; j < layerSize.height; j++)
            {
               var tiled = layer.getTiledTileAt(i ,j, true) //取得牆壁圖層內每一塊瓦片
               if(tiled.gid != 0) //如果瓦片存在
               {
                  gameModel.TpPosition.push(tiled.node.convertToWorldSpaceAR(cc.v2(0,0))) 
                  
               }
            }
        }
        console.log(gameModel.TpPosition)
    },
    // update (dt) {},
});
