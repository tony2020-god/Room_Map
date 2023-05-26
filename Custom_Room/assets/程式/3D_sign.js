

cc.Class({
    extends: cc.Component,

    properties: {
       items :{
         default : null,
         type:cc.Prefab
       },
       items2 :{
        default : null,
        type:cc.Node
      }
    },


    onLoad () {
        this.itemlist = []
        this.Arrey1 = []
        this.Arrey2 = []
        this.Arrey3 = []
        this.count = 100
        this.index = 0
        this.len = 360 / 33
        for(var i = 0; i < 99; i++)
        {
            var node = cc.instantiate(this.items);
            node.parent = cc.find("畫布")
            this.itemlist.push(node);
        }
    },

    start () {
        this.schedule(function() { 
            this.PhotoAni();
         }, 0.1, 99);
    },

    PhotoAni(){
        var rotate = this.len * this.index + this.len
        if(this.count < 34)
        {
            cc.tween(this.itemlist[this.count])
            .by(0.1, { eulerAngles :  cc.v3(0, rotate,0)})
            .by(0.5, { position : cc.v3(0, 0, 675.75)})
            .start();
            if(this.count == 33) this.index = 0
        }
        else if(this.count > 33 && this.count < 67)
        {
            cc.tween(this.itemlist[this.count])
            .by(0.1, { eulerAngles :  cc.v3(0, rotate,0)})
            .by(0.5, { position : cc.v3(0, 240,675.75)})
            .start();
            if(this.count == 66) this.index = 0
        }
        else if(this.count > 66 && this.count < 100)
        {
            cc.tween(this.itemlist[this.count])
            .by(0.1, { eulerAngles :  cc.v3(0, rotate,0)})
            .by(0.5, { position : cc.v3(0, 480,675.75)})
            .start();
            if(this.count == 99) this.index = 0
        }
        this.count --
        this.index ++
    },
    // update (dt) {},
});
