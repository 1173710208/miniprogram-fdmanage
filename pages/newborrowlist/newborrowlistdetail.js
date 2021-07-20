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
        var borrowListinfo = app.globalData.borrowList
        let index = borrowListinfo.findIndex(v => v.id == this.data.borrowlist_id);
        // console.log(index);
        var goodsObj = borrowListinfo[index];
        this.setData({
                borrowList: borrowListinfo,
                goodsObj
            })
            // console.log(this.data.goodsObj);
    },
    //删除
    jiedan() {
        for (var i = 0; i < this.data.borrowList.length; i++) {
            if (this.data.borrowList[i].id == this.data.borrowlist_id) {
                var index = i;
            }
        }
        var goodsObj = app.globalData.borrowList[index];
        // console.log(goodsObj)
        goodsObj.state = 1;
        app.globalData.borrowList.splice(index, 1, goodsObj);
        wx.setStorageSync("borrowList", app.globalData.borrowList);
        app.globalData.newborrownum = app.globalData.newborrownum - 1;
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