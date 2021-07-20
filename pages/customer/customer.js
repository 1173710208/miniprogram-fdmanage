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
                value: '男',
                checked: false
            },
            {
                id: 0,
                value: '女',
                checked: false
            }
        ],
        plan: [],
        planradio: [],
        dayradio: [{
                id: 0,
                value: '已过期',
                checked: false
            },
            {
                id: 1,
                value: '未过期',
                checked: false
            }
        ],
        sexradiochoiceid: 'default',
        planradiochoiceid: 'default',
        dayradiochoiceid: 'default',
    },

    //防抖
    TimeId: -1,

    onShow: function() {
        this.getGoodsList();
        this.getplancateradio();
    },

    // 输入框的值改变 就会触发的事件
    handleInput(e) {
        // 1 获取输入框的值
        const { value } = e.detail;
        // 2 检测合法性
        if (!value.trim()) {
            clearTimeout(this.TimeId);
            this.setData({
                    searchgoodsList: [],
                    isFocus: false,
                    searchStatus: false,
                })
                // console.log(this.data);
                // 值不合法
            return;
        }
        // 3 准备发送请求获取数据
        this.setData({
                isFocus: true,
                inpValue: value,
                searchStatus: true,
            })
            // console.log(this.data);
        clearTimeout(this.TimeId);
        this.TimeId = setTimeout(() => {
            this.getGoodsList();
        }, 1000);
    },

    //清除输入框
    clearKeyword: function() {
        this.setData({
            inpValue: "",
            isFocus: false,
            searchgoodsList: [],
            searchStatus: false,
        });
        this.getGoodsList();
        // console.log(this.data);
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
        var customerList = app.globalData.customerList;
        // console.log(customerList);
        var goodsList = [];
        var searchquery = this.data.inpValue;
        var sorttypequery = this.data.currentSortType;
        var sortorderquery = this.data.currentSortOrder;
        var sexradiochoiceid = this.data.sexradiochoiceid;
        var planradiochoiceid = this.data.planradiochoiceid;
        var dayradiochoiceid = this.data.dayradiochoiceid;
        console.log(searchquery, sorttypequery, sortorderquery, sexradiochoiceid, planradiochoiceid, dayradiochoiceid);
        if (sorttypequery == 'default') {
            customerList = app.globalData.customerList;
        } else if (sorttypequery != 'default') {
            goodsList = customerList;
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
            customerList = goodsList;
        }
        if (this.data.searchStatus == true) {
            goodsList = [];
            for (var i = 0; i < customerList.length; i++) {
                if (customerList[i].name.indexOf(searchquery) >= 0) {
                    goodsList.push(customerList[i]);
                }
            }
            customerList = goodsList;
        }
        if (sexradiochoiceid != 'default') {
            goodsList = [];
            for (var i = 0; i < customerList.length; i++) {
                // console.log(customerList[i].gender)
                if (sexradiochoiceid == customerList[i].gender) {
                    goodsList.push(customerList[i]);
                }
            }
            customerList = goodsList;
        }
        if (planradiochoiceid != 'default') {
            goodsList = [];
            for (var i = 0; i < customerList.length; i++) {
                if (planradiochoiceid == customerList[i].plan) {
                    goodsList.push(customerList[i]);
                }
            }
            customerList = goodsList;
        }
        if (dayradiochoiceid != 'default') {
            goodsList = [];
            for (var i = 0; i < customerList.length; i++) {
                if (customerList[i].day == dayradiochoiceid) {
                    goodsList.push(customerList[i]);
                }
            }
            customerList = goodsList;
        }



        this.setData({
            goodsList: customerList

        })
        console.log(customerList)

        //存入本地缓存
        var customerstorage = this.data.goodsList;
        wx.setStorageSync('customerstorage', customerstorage);
    },

    //获取条件筛选选项
    getplancateradio: function() {
        var plan = app.globalData.plan;
        var planradio = [];
        for (var i = 0; i < plan.length; i++) {
            let object = { id: 0, value: "", checked: false };
            object.id = plan[i].id;
            object.value = plan[i].name;
            object.checked = false;
            planradio[i] = object;
        }
        this.setData({
                planradio,
                plan,
            })
            // console.log(this.data.plan, this.data.planradio)
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

        // console.log(this.data.sexradiochoiceid)
        // console.log(this.data.sexradio)

    },

    chooseplanradio: function(e) {
        let index = e.currentTarget.dataset.id;
        let planradio = this.data.planradio;
        if (planradio[index].checked == false) {
            for (let i = 0; i < planradio.length; i++) {
                this.data.planradio[i].checked = false;
            }
            this.data.planradio[index].checked = true;
        } else if (planradio[index].checked == true) {
            for (let i = 0; i < planradio.length; i++) {
                this.data.planradio[i].checked = false;
            }
            this.data.planradio[index].checked = false;
        }
        let userRadio = planradio.filter((item, index) => {
            return item.checked == true;
        })
        if (userRadio != '') {
            this.setData({
                planradio: this.data.planradio,
                planradiochoiceid: userRadio[0].id,
            })
        } else {
            this.setData({
                planradio: this.data.planradio,
                planradiochoiceid: 'default',
            })
        }

        // console.log(this.data.planradiochoiceid)
        // console.log(this.data.planradio)
    },
    choosedayradio: function(e) {
        let index = e.currentTarget.dataset.id;
        let dayradio = this.data.dayradio;
        if (dayradio[index].checked == true) {
            for (let i = 0; i < dayradio.length; i++) {
                this.data.dayradio[i].checked = false;
            }
            this.data.dayradio[index].checked = false;
        } else if (dayradio[index].checked == false) {
            for (let i = 0; i < dayradio.length; i++) {
                this.data.dayradio[i].checked = false;
            }
            this.data.dayradio[index].checked = true;
        }
        let userRadio = dayradio.filter((item, index) => {
            return item.checked == true;
        })
        if (userRadio != '') {
            this.setData({
                dayradio: this.data.dayradio,
                dayradiochoiceid: userRadio[0].id,
            })
        } else {
            this.setData({
                dayradio: this.data.dayradio,
                dayradiochoiceid: 'default',
            })
        }

        // console.log(this.data.dayradiochoiceid)
        // console.log(this.data.dayradio)
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