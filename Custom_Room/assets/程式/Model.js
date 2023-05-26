///共用模塊js
var NowTarget = "";
var ObjectData = [
    {
        id: 1,
        name: '小圓桌',
        tag: "不可穿過物件",
    },
    {
        id: 2,
        name: '大圓桌',
        tag: "不可穿過物件",
    },
    {
        id: 3,
        name: '講桌',
        tag: "不可穿過物件",
    },
];
var MouseType = null
var TpPosition = []
//要在自己的腳本導出變量才能讓別人繼承  
module.exports = {    
    NowTarget, //目前選定的物件
    ObjectData, //所有物件
    MouseType,
    TpPosition,
};