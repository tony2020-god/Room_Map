const Input = {};
var Ani_Color = require("Ani_Color");
var gameModel = require("Model");

cc.Class({
    extends: cc.Component,

    properties: {
        AttackRange:{
            default : [],
            type:cc.Node
        },
        MpBar:{
            default : null,
            type:cc.Sprite
        },
        SpBar:{
            default : null,
            type:cc.Sprite
        },
        SkillBtn:{
            default : [],
            type:cc.Button
        }
    },

    // LIFE-CYCLE CALLBACKS:

    
    onLoad () {
       cc.systemEvent.on('keydown', this.OnKeyDown, this)
       cc.systemEvent.on('keyup', this.OnKeyUP, this)
       this.RoleAni = this.node.getComponent(cc.Animation)
       cc.director.getPhysicsManager().enabled = true;
       cc.director.getPhysicsManager().deBugDrawFlags = true;
       this.otherKeyDown = []
       this.NowDirection = "下"
       this.Attacking = false
       this.Charging = false
       this.currentAni = "往下待機"
       this.Teleporting = false
       this.Shift = false
       this.RoleAni.on('finished',  this.onFinished,this);
       this.Mp = 100
       this.Sp = 0
    },

    start () {
    },

    OnKeyDown(e){
        if(Input[cc.macro.KEY.space] == 1)
        {      
             if(this.Charging == false) this.RoleAni.play("充能")
             this.Charging = true
             this.Mp = this.Mp < 100 ? this.Mp + 1 : this.Mp
             this.MpProgressBar()
             return;
        }
       if(e.keyCode == 16)
       {
         Input[e.keyCode] = 1
         this.Shift = true
       } 
       
       console.log( e.keyCode)
       if(this.Attacking == true || this.Charging == true || this.Teleporting == true) return;
       if(Input[e.keyCode] == 1) return
       Input[e.keyCode] = 1
       if (Input[cc.macro.KEY.a] == 1 ||  Input[cc.macro.KEY.d] == 1 || Input[cc.macro.KEY.w] == 1 || Input[cc.macro.KEY.s] == 1) 
       {
           if(e.keyCode == 65) this.NowDirection = "左"
           else if(e.keyCode == 68) this.NowDirection = "右"
           else if(e.keyCode == 87) this.NowDirection = "上"
           else if(e.keyCode == 83) this.NowDirection = "下"
           this.otherKeyDown.push(e.keyCode)
           this.judgeMotion("移動")
       }
    },

    OnKeyUP(e){
        Input[e.keyCode] = 0
        if(Input[cc.macro.KEY.space] == 0) this.Charging = false
        if(Input[cc.macro.KEY.shift] == 0) this.Shift = false
        if(this.Attacking == true || this.Charging == true || this.Teleporting == true) return;
        this.otherKeyDown.splice(this.otherKeyDown.indexOf(e.keyCode), 1) 
        if(this.otherKeyDown.length != 0) 
        {
            if (Input[cc.macro.KEY.a]) this.NowDirection = "左"
            else if (Input[cc.macro.KEY.d]) this.NowDirection = "右"
            else if (Input[cc.macro.KEY.w]) this.NowDirection = "上"
            else if (Input[cc.macro.KEY.s]) this.NowDirection = "下"
            this.judgeMotion("移動")
            return
        }
        this.judgeMotion("待機")
    },

    Attack(){
        if(this.Attacking == true || this.Charging == true || this.Teleporting == true) return;
        this.Attacking = true
        if(this.Shift == true && this.Sp == 100)
        {
            this.Ultimate()
            return;
        }
        this.judgeMotion("攻擊")
        if(this.NowDirection == "下") this.AttackRange[1].active = true
        else if(this.NowDirection == "上") this.AttackRange[0].active = true
        else if(this.NowDirection == "左") this.AttackRange[2].active = true
        else if(this.NowDirection == "右") this.AttackRange[3].active = true
    },

    onFinished(){
        for(var i = 0; i < this.AttackRange.length; i++)
        {
            this.AttackRange[i].active = false
        }
        Input[cc.macro.KEY.a] = 0
        Input[cc.macro.KEY.d] = 0
        Input[cc.macro.KEY.w] = 0
        Input[cc.macro.KEY.s] = 0
        this.otherKeyDown = []
        this.Attacking = false
        if(this.Teleporting == true) this.Teleport();
        this.judgeMotion("待機")
    },

    judgeMotion(status){
        
        if(this.NowDirection == "下") this.RoleAni.play("往下" + status)
        else if(this.NowDirection == "上") this.RoleAni.play("往上" + status)
        else if(this.NowDirection == "左") this.RoleAni.play("往左" + status)
        else if(this.NowDirection == "右") this.RoleAni.play("往右" + status)
        this.currentAni = "往" + this.NowDirection + status
    },

    Skill1(){
        if(this.Attacking == true || this.Charging == true || this.Teleporting == true) return;
        this.Attacking = true
        this.Mp -= 50
        this.RoleAni.play("迴旋盾")
        this.MpProgressBar()
    },

    Skill2(){
        if(this.Attacking == true || this.Charging == true || this.Teleporting == true)  return;
        this.Teleporting = true
        //this.Mp -= 100
        this.RoleAni.play("飛雷神")
        this.MpProgressBar()
    },

    Ultimate(){
        
        this.Sp = 0
        this.RoleAni.play("大招")
        this.SpProgressBar()
        this.AttackRange[4].active = true
    },

    Teleport(){
        var randomPos = Math.floor(Math.random() * gameModel.TpPosition.length)
        this.node.setPosition(this.node.parent.convertToNodeSpaceAR(gameModel.TpPosition[randomPos]))
        this.Teleporting = false
    },

    MpProgressBar(){
        this.MpBar.fillRange = this.Mp / 100;
        if(this.Mp < 50) this.SkillBtn[0].interactable = false
        else this.SkillBtn[0].interactable = true

        if(this.Mp < 100) this.SkillBtn[1].interactable = false
        else this.SkillBtn[1].interactable = true
    },

    SpProgressBar(){
        this.SpBar.fillRange = this.Sp / 100;
        if(this.Sp == 100) this.SpBar.node.getComponent(Ani_Color).OpenAni()
        else 
        {
            this.SpBar.node.getComponent(Ani_Color).CloseAni()
            this.SpBar.node.color = cc.color(255,200,0,255);
        }
    },

    update (dt) {
        var Speed = this.node.getComponent(cc.RigidBody).linearVelocity
        if(this.Attacking == true) 
        {
            Speed.y = 0
            Speed.x = 0
            this.node.getComponent(cc.RigidBody).linearVelocity = Speed 
            return;
        }
        if (this.currentAni == "往左移動")
        {
           Speed.y = 0
           Speed.x = -1000
        }
        else if (this.currentAni == "往右移動")
        {
            Speed.y = 0
            Speed.x = 1000
        }
        else Speed.x = 0

        if (this.currentAni == "往上移動")
        {
           Speed.y = 1000
           Speed.x = 0
        }
        else if (this.currentAni == "往下移動")
        {
            Speed.y = -1000
            Speed.x = 0
        }
        else Speed.y = 0
        this.node.getComponent(cc.RigidBody).linearVelocity = Speed 
    },
});
