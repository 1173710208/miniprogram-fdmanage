// pages/books/plandetail.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        plan_id: 0,
        goodsObj: {},
        plan: [],
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
        const { plan_id } = options;
        this.setData({
            plan_id
        })

        // console.log(this.data.plan_id);
        //demo 读取本地存储
        var plan = wx.getStorageSync('plan');
        let index = plan.findIndex(v => v.id == this.data.plan_id);
        // console.log(index);
        var goodsObj = plan[index];
        this.setData({
            goodsObj,
            plan,
        })
        console.log(this.data.goodsObj);
        //this.getGoodsDetail(plan_id);
    },

    // 获取商品详情数据
    getGoodsDetail(plan_id) {

        const url = "http://localhost/PHP/search.php?value=" + plan_id; //
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
            url: '/pages/plan/planedit?plan_info=' + queryBean,
        })
    },

    //删除
    delete() {
        for (var i = 0; i < this.data.plan.length; i++) {
            if (this.data.plan[i].id == this.data.plan_id) {
                var index = i;
            }
        }
        this.data.plan.splice(index, 1);
        app.globalData.plan = this.data.plan;
        wx.setStorageSync("plan", app.globalData.plan);
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