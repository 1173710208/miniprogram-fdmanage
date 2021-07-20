Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodscate_id: 0,
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
        const { goodscate_id } = options;
        this.setData({
            goodscate_id
        })

        // console.log(this.data.goodscate_id);
        //demo 读取本地存储
        var goodscateinfo = wx.getStorageSync('goodscatestorage');
        let index = goodscateinfo.findIndex(v => v.id == this.data.goodscate_id);
        // console.log(index);
        var goodsObj = goodscateinfo[index];
        this.setData({
            goodsObj
        })
        console.log(this.data.goodsObj);
        //this.getGoodsDetail(goodscate_id);
    },

    // 获取商品详情数据
    getGoodsDetail(goodscate_id) {

        const url = "http://localhost/PHP/search.php?value=" + goodscate_id; //
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
            url: '/pages/goods/goodscateedit?goodscate_info=' + queryBean,
        })
    },

    //删除
    delete() {
        wx.showModal({
            title: '',
            content: '确认删除该类别',
            success(res) {
                if (res.confirm) {
                    //从数据库删除
                    wx.request({
                        url: '', //示例接口未填写
                        success: res => {
                            console.log(res.data)
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
                        fail: function() {
                            wx.showToast({
                                title: '删除失败',
                                icon: 'error',
                                duration: 1000,
                            });
                        }
                    })
                } else if (res.cancel) {
                    // console.log('用户点击取消');
                }
            }
        })
    },
})