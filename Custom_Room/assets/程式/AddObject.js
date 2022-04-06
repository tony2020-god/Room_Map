var gameModel = require("Model");
var ItemsData = require("ItemsData");
var MouseControl = require("MouseControl");

cc.Class({
    extends: cc.Component,

    properties: {
        MouseObject :{
           default : null,
           type:cc.Node
        },

        ObjectItems:{
            default : [],
            type:cc.Node
         },

    },


    onLoad () {
       this.choose = false
       this.itemlist = []
       this.node.on("mousemove",this.onTouchMove,this);
    },

    onTouchMove(event){
       if(this.choose == false) return
       this.MouseObject.x = event.getLocationX()
       this.MouseObject.y = event.getLocationY()
    },

    start () {
      this.SpawnObject()
    },



    Click(event, customEventData){
        gameModel.MouseType =  customEventData
        if(this.MouseObject.getComponent(cc.Sprite).spriteFrame == event.target.getComponent(cc.Sprite).spriteFrame)
        {
            this.choose = false ;
            this.MouseObject.getComponent(cc.Sprite).spriteFrame = null
        }
        else 
        {
            this.choose = true ;
            this.MouseObject.x = event.getLocationX()
            this.MouseObject.y = event.getLocationY()
            this.MouseObject.getComponent(cc.Sprite).spriteFrame = event.target.getComponent(cc.Sprite).spriteFrame
            this.MouseObject.getComponent(cc.BoxCollider).size = this.MouseObject._contentSize    
            this.MouseObject.getComponent(MouseControl).NowData(event.target.getComponent(ItemsData).ObjectData)
            this.MouseObject.getComponent(MouseControl).status = "可以放置物件"
        }
    },

    SpawnObject(){
        for(var i = 0; i < gameModel.ObjectData.length; i++)
        {
            var obj =this.ObjectItems[i].getComponent(ItemsData);//抓取WinnerItem
            this.itemlist.push(obj);
            this.itemlist[i].inData(gameModel.ObjectData[i]);
        }
    },

    update (dt) {

    },
});
