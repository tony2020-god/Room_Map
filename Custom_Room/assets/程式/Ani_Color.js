
///透明度漸層動畫js
cc.Class({
    extends: cc.Component,

    properties: {
        Time: {
            default: 0.5,
            type : cc.Float
        },
        Color1: {
            default: [],
            type : cc.Float
        },
        Color2: {
            default: [],
            type : cc.Float
        },
        Delay: {
            default: 0,
            type : cc.Float
        },
    },

    start () {
        this.Twinkling = null
    },
    OpenAni(){
       if(this.Twinkling == null) this.TwinklingAni();
    },
    CloseAni(){
       
       if(this.Twinkling == null) return
       this.Twinkling.stop();
       this.Twinkling = null
    },
    TwinklingAni(){
       this.Twinkling = cc.tween(this.node)
        .repeatForever(cc.tween()
        .to(this.Time, {color: cc.color(this.Color1[0], this.Color1[1], this.Color1[2])})
        .to(this.Time, {color: cc.color(this.Color2[0], this.Color2[1], this.Color2[2])})
        .delay(this.Delay)
        )
        .start()
    }
    // update (dt) {},
});
