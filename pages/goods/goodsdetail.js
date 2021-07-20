var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goods_id: 0,
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
        const { goods_id } = options;
        this.setData({
            goods_id
        })

        // console.log(this.data.goods_id);
        //demo 读取本地存储
        var goodsinfo = app.globalData.goodList
        let index = goodsinfo.findIndex(v => v.id == this.data.goods_id);
        // console.log(index);
        var goodsObj = goodsinfo[index];
        this.setData({
            goodList: goodsinfo,
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
            url: '/pages/goods/goodsedit?goods_info=' + queryBean,
        })
    },

    //删除
    delete() {
        for (var i = 0; i < this.data.goodList.length; i++) {
            if (this.data.goodList[i].id == this.data.goods_id) {
                var index = i;
            }
        }
        this.data.goodList.splice(index, 1);
        app.globalData.goodList = this.data.goodList;
        wx.setStorageSync("goodList", app.globalData.goodList);
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