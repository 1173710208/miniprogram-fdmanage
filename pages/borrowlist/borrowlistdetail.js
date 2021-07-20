var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        borrowlist_id: 0,
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
        const { borrowlist_id } = options;
        this.setData({
            borrowlist_id
        })

        // console.log(this.data.borrowlist_id);
        //demo 读取本地存储
        var borrowlistinfo = app.globalData.borrowList
        let index = borrowlistinfo.findIndex(v => v.id == this.data.borrowlist_id);
        // console.log(index);
        var goodsObj = borrowlistinfo[index];
        this.setData({
            borrowList: borrowlistinfo,
            goodsObj
        })
        console.log(this.data.goodsObj);
    },
})