const originData = {
    mapName: 'map_01',
    chineseName: '地图甲',
    playerProperty: { // 玩家属性
        life: 3, // 生命值
        gravity: 1, // 所受重力
    },
    blocks: null
}

cc.Class({
    extends: cc.Component,

    onLoad() {
        this.mapData = JSON.parse(JSON.stringify(originData)) // 深拷贝
    },

    getMapData() {
        return this.mapData
    },

})
