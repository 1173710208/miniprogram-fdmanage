var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        assistant_id: 0,
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
        const { assistant_id } = options;
        this.setData({
            assistant_id
        })

        // console.log(this.data.assistant_id);
        //demo 读取本地存储
        var assistantinfo = app.globalData.assistantList
        let index = assistantinfo.findIndex(v => v.id == this.data.assistant_id);
        // console.log(index);
        var goodsObj = assistantinfo[index];
        this.setData({
            assistantList: assistantinfo,
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
            url: '/pages/assistant/assistantedit?assistant_info=' + queryBean,
        })
    },

    //删除
    delete() {
        for (var i = 0; i < this.data.assistantList.length; i++) {
            if (this.data.assistantList[i].id == this.data.assistant_id) {
                var index = i;
            }
        }
        this.data.assistantList.splice(index, 1);
        app.globalData.assistantList = this.data.assistantList;
        wx.setStorageSync("assistantList", app.globalData.assistantList);

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