// pages/category/index.js
var app = getApp();

Page({

    //页面的初始数据
    data: {
        // 条形码返回值
        scanCodeMsg: 0,
        booksnum: 0,
        customernum: 0,
        xse:3279,
        seven:3,
        todaysellnum:5,
        todayborrownum:3,
    },

    //获取扫描二维码或条形码
    scanCode: function() {
        var that = this;
        wx.scanCode({ //扫描API     
            scanType: ['barCode', 'qrCode'],
            success(res) { //扫描成功
                // console.log(res) //输出回调信息
                that.setData({
                    scanCodeMsg: res.result
                });
                wx.showToast({
                    title: '扫描成功',
                    icon: 'success',
                    duration: 1000
                })
                setTimeout(function() {
                    //要延时执行的代码
                    wx.navigateTo({
                        url: '/pages/books/newbooks2?isbn=' + that.data.scanCodeMsg
                    })
                }, 1000)
            },
            fail: (res) => {
                wx.showToast({
                    title: '扫描失败',
                    icon: 'warn',
                    duration: 1000
                })
            },

        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        var booksnum = app.globalData.booksnum;
        var customernum = app.globalData.customernum;
        var newsellnum= app.globalData.newsellnum;
        var newborrownum = app.globalData.newborrownum;

        this.setData({
            booksnum,
            customernum,
            newsellnum,
            newborrownum,
        })
    },

})