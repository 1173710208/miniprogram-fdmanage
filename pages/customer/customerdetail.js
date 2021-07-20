var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        customer_id: 0,
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
        const { customer_id } = options;
        this.setData({
            customer_id
        })

        // console.log(this.data.customer_id);
        //demo 读取本地存储
        var customerinfo = app.globalData.customerList
        let index = customerinfo.findIndex(v => v.id == this.data.customer_id);
        // console.log(index);
        var goodsObj = customerinfo[index];
        this.setData({
            customerList: customerinfo,
            goodsObj
        })
        console.log(this.data.goodsObj);
    },

    // 点击轮播图 放大预览
    handlePrevewImage(e) {
        const urls = [];
        urls.push(this.data.goodsObj.pics);
        // console.log(urls);
        wx.previewImage({
            urls: urls[0]
        });
    },

    //跳转函数
    edit() {
        var that = this;
        //将对象转为string
        var queryBean = JSON.stringify(that.data.goodsObj);
        wx.navigateTo({
            url: '/pages/customer/customeredit?customer_info=' + queryBean,
        })
    },

    //删除
    delete() {
        for (var i = 0; i < this.data.customerList.length; i++) {
            if (this.data.customerList[i].id == this.data.customer_id) {
                var index = i;
            }
        }
        this.data.customerList.splice(index, 1);
        app.globalData.customerList = this.data.customerList;
        wx.setStorageSync("customerList", app.globalData.customerList);
        app.globalData.customernum = app.globalData.customernum - 1;
        wx.showToast({
            title: '删除成功',
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