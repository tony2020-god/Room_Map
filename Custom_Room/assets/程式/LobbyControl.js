
cc.Class({
    extends: cc.Component,

    properties: {
        waitingServer :{
            default : null,
            type:cc.Node
        },
        waitingStart :{
            default : null,
            type:cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {},

    start () {
        console.log("Photon: " + Photon)
        console.log("Photon.LoadBalancing: " + Photon.LoadBalancing)
        var self = this
        const appID = "9f41173a-4fe5-4ce7-b34f-df8362b6e6da";
        this.client = new Photon.LoadBalancing.LoadBalancingClient(Photon.ConnectionProtocol.Wss, appID, "")
        this.client.connectToRegionMaster("jp")
        // 监听新玩家加入房间的事件
        this.client.onActorJoin((actor) => {
            console.log("玩家加入房间:", actor.name, actor.actorNr);
            // 处理新玩家加入房间的逻辑
            self.waitingStart.getComponent(cc.Label).string = "等待玩家加入 " + this.client.myRoomActorCount() + " / 3"
        });
 /*        // 监听连接状态变化
        this.client.StateChanged.add((state) => {
          switch (state) {
            case Photon.LoadBalancing.LoadBalancingClient.State.ConnectedToMaster:
              console.log("已成功连接到服务器");
              // 连接成功后可以进行其他操作
              break;
            case Photon.LoadBalancing.LoadBalancingClient.State.Disconnected:
              console.log("与服务器断开连接");
              // 连接断开后的处理
              break;
            // 其他状态...
          }
        }); */
       

        this.schedule(this.judgeServerConnet, 1);
    },


    judgeServerConnet(){ 
        if (this.client.isInLobby() == true)
        {
            console.log("%c 已成功連到伺服器", "color: #00FF38;")
            this.waitingServer.active = false
            this.unschedule(this.judgeServerConnet)
        }
    },

    StartMatch(){
         //this.client.createRoom()
         this.client.joinRandomOrCreateRoom()
         this.waitingStart.active = true
/*          this.scheduleOnce(function() { 
            console.log("房間有幾人: " +  this.client.myRoomActorCount())
         }, 3); */
    }
    // update (dt) {},
});
