var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        selllist_id: 0,
        goodsObj: {},
    },
    GoodsInfo: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function() {
        let pages = getCurrentPages();
        let currentPage = pages[pages.length - 1];
        let options = currentPage.options;
        // console.log(options)
        const { selllist_id } = options;
        this.setData({
            selllist_id
        })

        // console.log(this.data.selllist_id);
        //demo 读取本地存储
        var sellListinfo = app.globalData.sellList
        let index = sellListinfo.findIndex(v => v.id == this.data.selllist_id);
        // console.log(index);
        var goodsObj = sellListinfo[index];
        this.setData({
                sellList: sellListinfo,
                goodsObj
            })
            // console.log(this.data.goodsObj);
    },
    //删除
    jiedan() {
        for (var i = 0; i < this.data.sellList.length; i++) {
            if (this.data.sellList[i].id == this.data.selllist_id) {
                var index = i;
            }
        }
        var goodsObj = app.globalData.sellList[index];
        // console.log(goodsObj)
        goodsObj.state = 1;
        app.globalData.sellList.splice(index, 1, goodsObj);
        wx.setStorageSync("sellList", app.globalData.sellList);
        app.globalData.newsellnum = app.globalData.newsellnum - 1;
        wx.showToast({
            title: '接单成功',
            icon: 'success',
            duration: 1000,
        });
        setTimeout(function() {
            //要延时执行的代码
            wx.navigateBack({
                delta: 1
            });
        }, 1000)
    },
})