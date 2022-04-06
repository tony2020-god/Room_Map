import {
    downloadJsonFile,
    uploadJsonFile
} from 'mapFileWrapper'

const EDITOR_WINDOW_WIDTH = 605 // 地图编辑窗宽度
const EDITOR_WINDOW_HEIGHT = 445 // 地图编辑窗高度

cc.Class({
    extends: cc.Component,

    onLoad() {
        this.mapDataManager = this.node.getComponent('mapData')
        this.map = cc.find("畫布")
    },

    // 下载地图
    btn_DownloadMap() {
        this.mapDataManager.mapData.blocks = this.map
        console.log(this.mapDataManager.mapData.blocks)
        let mapData = this.mapDataManager.getMapData()
        let content = JSON.stringify(mapData)
        let name = mapData.mapName
        downloadJsonFile(content, name)
    },

    // 上传地图
    btn_UploadMap() {
        uploadJsonFile().then(mapString => {
            this.btn_ClearMapBlocks()
            this.mapDataManager.mapData = JSON.parse(mapString)
            var scene = cc.director.getScene()
            var node = cc.instantiate(this.mainMapData.mapData.blocks);
            node.parent = scene;
        })
    },


});
