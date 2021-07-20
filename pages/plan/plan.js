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
        //搜索状态
        searchStatus: false,
    },

    //防抖
    TimeId: -1,

    onShow: function() {
        var goodsList = app.globalData.plan
        this.setData({
            goodsList
        })
        console.log(this.data.goodsList);


        //存入本地缓存
        var plan = this.data.goodsList;
        wx.setStorageSync('plan', plan);
        // console.log(this.data);
    },

    // 输入框的值改变 就会触发的事件
    handleInput(e) {
        // 1 获取输入框的值
        const { value } = e.detail;
        // 2 检测合法性
        if (!value.trim()) {
            clearTimeout(this.TimeId);
            this.setData({
                isFocus: false,
                inpValue: "",
                searchStatus: false,
                goodsList: app.globalData.plan,
            })
            console.log(this.data);
            // 值不合法
            return;
        }
        // 3 准备发送请求获取数据
        this.setData({
                isFocus: true,
                inpValue: value,
            })
            // console.log(this.data);
        clearTimeout(this.TimeId);
        this.TimeId = setTimeout(() => {
            this.qsearch(value);
        }, 1000);
    },

    //总页数
    // totalPage: 1,

    //清除输入框
    clearKeyword: function() {
        this.setData({
            inpValue: "",
            isFocus: false,
            searchStatus: false,
            goodsList: app.globalData.plan,
        });
        // console.log(this.data);
    },

    //搜索请求发送
    qsearch(keyWord) {
        var list = this.data.goodsList;
        var arr = [];
        for (var i = 0; i < list.length; i++) {
            if (list[i].name.indexOf(keyWord) >= 0) {
                arr.push(list[i]);
            }
        }
        this.setData({
            goodsList: arr,
            searchStatus: true,
        })
        console.log(arr)
            // return arr;
    },
})