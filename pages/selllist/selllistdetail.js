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
        var selllistinfo = app.globalData.sellList
        let index = selllistinfo.findIndex(v => v.id == this.data.selllist_id);
        // console.log(index);
        var goodsObj = selllistinfo[index];
        this.setData({
            selllist: selllistinfo,
            goodsObj
        })
        console.log(this.data.goodsObj);
    },
})