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
        var borrowList = app.globalData.borrowList;
        var goodsList = [];
        goodsList = [];
        for (var i = 0; i < borrowList.length; i++) {
            if (borrowList[i].state == 0) {
                goodsList.push(borrowList[i]);
            }
        }
        borrowList = goodsList;
        this.setData({
                goodsList: borrowList

            })
            // console.log(borrowList)

        //存入本地缓存
        var customerstorage = this.data.goodsList;
        wx.setStorageSync('customerstorage', customerstorage);
    },

})