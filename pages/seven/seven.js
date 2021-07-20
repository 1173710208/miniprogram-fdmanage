var util = require('../../utils/util.js');
var api = require('../../config/api.js');

var app = getApp()
Page({
    data: {
        // 取消 按钮 是否显示
        isFocus: false,
        // 输入框的值
        inpValue: "",
        //全部数据
        goodsList: [],
        //搜索后数据
        searchgoodsList: [],
    },

    onShow: function() {
        this.getGoodsList();
    },

    getGoodsList: function() {
        var customerList = app.globalData.customerList;
        // console.log(customerList);
        var goodsList = [{
                id: 8,
                phonenum: '18800416241',
                name: '徐洪磊',
                pics: 'https://www.hualigs.cn/image/60be3bb79f39d.jpg',
                gender: 1,
                password: 111,
                birthday: '1999-06-13',
                plan: 2,
                day: 1
            },
            {
                id: 13,
                phonenum: '18800416241',
                name: '小b',
                pics: 'https://www.hualigs.cn/image/60be3bb79f39d.jpg',
                gender: 1,
                password: 111,
                birthday: '1999-06-09',
                plan: 1,
                day: 0
            },
            {
                id: 12,
                phonenum: '18800416241',
                name: '小a',
                pics: 'https://www.hualigs.cn/image/60be3bb79f39d.jpg',
                gender: 0,
                password: 111,
                birthday: '1999-06-05',
                plan: 1,
                day: 0
            },
        ];
        this.setData({
                goodsList
            })
            // console.log(customerList)
    },
})