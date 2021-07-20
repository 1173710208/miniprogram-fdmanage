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
        //排序状态
        currentSortType: 'default',
        currentSortOrder: 'default',
        idSortOrder: 'default',
    },

    //防抖
    TimeId: -1,

    onShow: function() {
        this.getGoodsList();
    },

    //排序函数
    openSortFilter: function(event) {
        let currentId = event.currentTarget.id;
        // console.log(currentId);
        switch (currentId) {
            case 'idSort':
                if (this.data.idSortOrder == 'default') {
                    this.setData({
                        currentSortType: 'id',
                        currentSortOrder: 'desc',
                        idSortOrder: 'desc',
                    });
                } else if (this.data.idSortOrder == 'desc') {
                    this.setData({
                        currentSortType: 'id',
                        currentSortOrder: 'asc',
                        idSortOrder: 'asc',
                    });
                } else if (this.data.idSortOrder == 'asc') {
                    this.setData({
                        currentSortType: 'id',
                        currentSortOrder: 'desc',
                        idSortOrder: 'desc',
                    });
                }
                // console.log(this.data);
                var searchquery = this.data.inpValue;
                var sorttypequery = this.data.currentSortType;
                var sortorderquery = this.data.currentSortOrder;
                this.getGoodsList(searchquery, sorttypequery, sortorderquery);
                break;
            default:
                //综合排序
                this.setData({
                    currentSortType: 'default',
                    currentSortOrder: 'default',
                    idSortOrder: 'default',
                });
                // console.log(this.data);
                var searchquery = this.data.inpValue;
                var sorttypequery = this.data.currentSortType;
                var sortorderquery = this.data.currentSortOrder;
                this.getGoodsList();
        }
    },

    getGoodsList: function() {
        var feedback = app.globalData.feedback;
        // console.log(feedback);
        var goodsList = [];
        var searchquery = this.data.inpValue;
        var sorttypequery = this.data.currentSortType;
        var sortorderquery = this.data.currentSortOrder;
        var planradiochoiceid = this.data.planradiochoiceid;
        if (sorttypequery == 'default') {
            feedback = app.globalData.feedback;
        } else if (sorttypequery != 'default') {
            goodsList = feedback;
            if (sortorderquery == 'desc') {
                let i, j = 0;
                for (i = 0; i < goodsList.length; i++) {
                    for (j = 0; j < goodsList.length; j++) {
                        if (goodsList[i].id < goodsList[j].id) { // 相邻元素两两对比
                            let t = goodsList[i];
                            goodsList[i] = goodsList[j];
                            goodsList[j] = t;
                        }
                    }
                }

            } else if (sortorderquery == 'asc') {
                let i, j = 0;
                for (i = 0; i < goodsList.length; i++) {
                    for (j = 0; j < goodsList.length; j++) {
                        if (goodsList[i].id > goodsList[j].id) { // 相邻元素两两对比
                            let t = goodsList[i];
                            goodsList[i] = goodsList[j];
                            goodsList[j] = t;
                        }
                    }
                }
            }
            feedback = goodsList;
        }
        if (this.data.searchStatus == true) {
            goodsList = [];
            for (var i = 0; i < feedback.length; i++) {
                if (feedback[i].name.indexOf(searchquery) >= 0) {
                    goodsList.push(feedback[i]);
                }
            }
            feedback = goodsList;
        }
        if (planradiochoiceid != 'default') {
            goodsList = [];
            for (var i = 0; i < feedback.length; i++) {
                if (planradiochoiceid == feedback[i].post) {
                    goodsList.push(feedback[i]);
                }
            }
            feedback = goodsList;
        }
        this.setData({
            goodsList: feedback

        })
        console.log(feedback)
            //存入本地缓存
        var feedbackstorage = this.data.goodsList;
        wx.setStorageSync('feedbackstorage', feedbackstorage);
    },

})