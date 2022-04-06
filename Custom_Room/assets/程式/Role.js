const Input = {};

cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // LIFE-CYCLE CALLBACKS:

    
    onLoad () {
       cc.systemEvent.on('keydown', this.OnKeyDown, this)
       cc.systemEvent.on('keyup', this.OnKeyUP, this)
       this.RoleAni = this.node.getComponent(cc.Animation)
       cc.director.getPhysicsManager().enabled = true;
       this.otherKeyDown = 0
    },

    start () {
        this.RoleAni.play("idle")
    },

    OnKeyDown(e){
       if(Input[e.keyCode] == 1) return
       this.otherKeyDown += 1
       Input[e.keyCode] = 1
       if (Input[cc.macro.KEY.a] == 1 ||  Input[cc.macro.KEY.d] == 1 || Input[cc.macro.KEY.w] || Input[cc.macro.KEY.s]) this.RoleAni.play("right")
    },

    OnKeyUP(e){
        this.otherKeyDown -= 1
        Input[e.keyCode] = 0
        if(this.otherKeyDown != 0) return
        this.RoleAni.play("idle")
    },
    update (dt) {
        var Speed = this.node.getComponent(cc.RigidBody).linearVelocity


        if (Input[cc.macro.KEY.a])
        {
           this.node.setScale(-0.7,0.7)
           Speed.y = 0
           Speed.x = -1000
        }
        else if (Input[cc.macro.KEY.d])
        {
            this.node.setScale(0.7,0.7)
            Speed.y = 0
            Speed.x = 1000
        }
        else Speed.x = 0

        if (Input[cc.macro.KEY.w])
        {
           Speed.y = 1000
           Speed.x = 0
        }
        else if (Input[cc.macro.KEY.s])
        {
            Speed.y = -1000
            Speed.x = 0
        }
        else Speed.y = 0
        this.node.getComponent(cc.RigidBody).linearVelocity = Speed
    },
});
