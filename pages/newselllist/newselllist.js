var util = require('../../utils/util.js');
var api = require('../../config/api.js');

var app = getApp()
Page({
    data: {
        //全部数据
        goodsList: [],
    },


    onShow: function() {
        this.getGoodsList();
    },

    getGoodsList: function() {
        var sellList = app.globalData.sellList;
        var goodsList = [];
        goodsList = [];
        for (var i = 0; i < sellList.length; i++) {
            if (sellList[i].state == 0) {
                goodsList.push(sellList[i]);
            }
        }
        sellList = goodsList;
        this.setData({
                goodsList: sellList

            })
            // console.log(sellList)

        //存入本地缓存
        var customerstorage = this.data.goodsList;
        wx.setStorageSync('customerstorage', customerstorage);
    },

})