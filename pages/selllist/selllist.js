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
        //搜索状态
        searchStatus: false,
        //排序状态
        currentSortType: 'default',
        currentSortOrder: 'default',
        idSortOrder: 'default',
        //性别radio
        sexradio: [{
                id: 1,
                value: '已接单',
                checked: false
            },
            {
                id: 0,
                value: '未接单',
                checked: false
            },
            {
                id: 0,
                value: '退款订单',
                checked: false
            },
        ],
        sexradiochoiceid: 'default',
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
        var sellList = app.globalData.sellList;
        // console.log(sellList);
        var goodsList = [];
        var searchquery = this.data.inpValue;
        var sorttypequery = this.data.currentSortType;
        var sortorderquery = this.data.currentSortOrder;
        var sexradiochoiceid = this.data.sexradiochoiceid;
        console.log(searchquery, sorttypequery, sortorderquery, sexradiochoiceid);
        if (sorttypequery == 'default') {
            sellList = app.globalData.sellList;
        } else if (sorttypequery != 'default') {
            goodsList = sellList;
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
            sellList = goodsList;
        }
        if (this.data.searchStatus == true) {
            goodsList = [];
            for (var i = 0; i < sellList.length; i++) {
                if (sellList[i].title.indexOf(searchquery) >= 0) {
                    goodsList.push(sellList[i]);
                }
            }
            sellList = goodsList;
        }
        if (sexradiochoiceid != 'default') {
            goodsList = [];
            for (var i = 0; i < sellList.length; i++) {
                // console.log(sellList[i].cate)
                if (sexradiochoiceid == sellList[i].state) {
                    goodsList.push(sellList[i]);
                }
            }
            sellList = goodsList;
        }



        this.setData({
                goodsList: sellList

            })
            // console.log(sellList)

        //存入本地缓存
        var customerstorage = this.data.goodsList;
        wx.setStorageSync('customerstorage', customerstorage);
    },


    //点击我显示底部弹出框
    clickme: function() {
        this.showModal();
    },
    //显示对话框
    showModal: function() {
        // 显示遮罩层
        var animation = wx.createAnimation({
            duration: 50,
            timingFunction: "linear",
            delay: 0
        })
        this.animation = animation
        animation.translateY(300).step()
        this.setData({
            animationData: animation.export(),
            showModalStatus: true
        })
        setTimeout(function() {
            animation.translateY(0).step()
            this.setData({
                animationData: animation.export()
            })
        }.bind(this), 50)
    },
    //隐藏对话框
    hideModal: function() {
        // 隐藏遮罩层
        var animation = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        })
        this.animation = animation
        animation.translateY(300).step()
        this.setData({
            animationData: animation.export(),
        })
        setTimeout(function() {
            animation.translateY(0).step()
            this.setData({
                animationData: animation.export(),
                showModalStatus: false
            })
        }.bind(this), 200)
    },
    hideModal2: function() {},
    //单选
    choosesexradio: function(e) {
        let index = e.currentTarget.dataset.id;
        let sexradio = this.data.sexradio;
        if (sexradio[index].checked == false) {
            for (let i = 0; i < sexradio.length; i++) {
                this.data.sexradio[i].checked = false;
            }
            this.data.sexradio[index].checked = true;
        } else if (sexradio[index].checked == true) {
            for (let i = 0; i < sexradio.length; i++) {
                this.data.sexradio[i].checked = false;
            }
            this.data.sexradio[index].checked = false;
        }
        let userRadio = sexradio.filter((item, index) => {
            return item.checked == true;
        })
        if (userRadio != '') {
            this.setData({
                sexradio: this.data.sexradio,
                sexradiochoiceid: userRadio[0].id,
            })
        } else {
            this.setData({
                sexradio: this.data.sexradio,
                sexradiochoiceid: 'default',
            })
        }

        console.log(this.data.sexradiochoiceid)
            // console.log(this.data.sexradio)

    },

    clearradiochoice: function() {
        this.hideModal2;
    },
    setradiochoice: function() {
        this.getGoodsList();
        this.hideModal2;
        this.setData({
            showModalStatus: false,
        })
    },
})