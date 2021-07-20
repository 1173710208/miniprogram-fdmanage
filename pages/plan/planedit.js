// pages/books/planedit.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsObj: {},
        imgchange: false,
        goodsList: [],
    },

    // 外网的图片的路径数组
    UpLoadImgs: '',

    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function() {
        var goodsList = app.globalData.plan
        this.setData({
            goodsList
        })
        let pages = getCurrentPages();
        let currentPage = pages[pages.length - 1];
        let options = currentPage.options;
        var that = this;
        var goodsObj = JSON.parse(options.plan_info);
        that.setData({
                goodsObj: goodsObj,
            })
            // console.log(that.data.goodsObj);
    },

    formSubmit: function(e) {
        // console.log(e);
        var that = this;
        var oldid = that.data.goodsObj.id;
        if (e.detail.value.name != '') {
            var newname = e.detail.value.name;
        } else {
            var newname = that.data.goodsObj.name
        };
        if (e.detail.value.price != '') {
            var newprice = e.detail.value.price;
        } else {
            var newprice = that.data.goodsObj.price
        };
        if (e.detail.value.days != '') {
            var newdays = e.detail.value.days;
        } else {
            var newdays = that.data.goodsObj.days
        };
        if (e.detail.value.day != '') {
            var newday = e.detail.value.day;
        } else {
            var newday = that.data.goodsObj.day
        };
        if (e.detail.value.nums != '') {
            var newnums = e.detail.value.nums;
        } else {
            var newnums = that.data.goodsObj.nums
        };

        for (var i = 0; i < that.data.goodsList.length; i++) {
            if (that.data.goodsList[i].id == oldid) {
                var index = i;
                this.setData({
                    goodsObj: {
                        name: newname,
                        id: oldid,
                        price: newprice,
                        days: newdays,
                        day: newday,
                        nums: newnums,
                    }
                })
                app.globalData.plan.splice(index, 1, this.data.goodsObj)
                wx.setStorageSync("plan", app.globalData.plan);
                wx.showToast({
                    title: '修改成功',
                    icon: 'success',
                    duration: 1000,
                });
                setTimeout(function() {
                    //要延时执行的代码
                    wx.navigateBack({
                        delta: 2
                    });
                }, 1000)
            }
        }
        // console.log(name)
    }
})