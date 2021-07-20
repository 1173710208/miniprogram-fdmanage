// pages/books/bookscatedetail.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bookscate_id: 0,
        goodsObj: {},
        bookscateList: [],
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
        const { bookscate_id } = options;
        this.setData({
            bookscate_id
        })

        // console.log(this.data.bookscate_id);
        //demo 读取本地存储
        var bookscateList = wx.getStorageSync('bookscateList');
        let index = bookscateList.findIndex(v => v.id == this.data.bookscate_id);
        // console.log(index);
        var goodsObj = bookscateList[index];
        this.setData({
            goodsObj,
            bookscateList,
        })
        console.log(this.data.goodsObj);
        //this.getGoodsDetail(bookscate_id);
    },

    // 获取商品详情数据
    getGoodsDetail(bookscate_id) {

        const url = "http://localhost/PHP/search.php?value=" + bookscate_id; //
        wx.request({
            url: url,
            success: res => {
                console.log(res.data)
                this.setData({
                    goodsObj: res.data
                })
            }
        })
    },

    // 点击轮播图 放大预览
    handlePrevewImage(e) {
        const urls = [];
        urls.push(this.data.goodsObj.pics);
        // console.log(urls);
        wx.previewImage({
            urls
        });
    },

    //跳转函数
    edit() {
        var that = this;
        //将对象转为string
        var queryBean = JSON.stringify(that.data.goodsObj);
        wx.navigateTo({
            url: '/pages/books/bookscateedit?bookscate_info=' + queryBean,
        })
    },

    //删除
    delete() {
        for (var i = 0; i < this.data.bookscateList.length; i++) {
            if (this.data.bookscateList[i].id == this.data.bookscate_id) {
                var index = i;
            }
        }
        this.data.bookscateList.splice(index, 1);
        app.globalData.bookscateList = this.data.bookscateList;
        wx.setStorageSync("bookscateList", app.globalData.bookscateList);
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