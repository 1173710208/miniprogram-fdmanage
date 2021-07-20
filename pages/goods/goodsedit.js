var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsObj: {},
        // 被选中的图片路径 数组
        chooseImgs: '',
        imgchange: false,
        planradio: [{
                id: 1,
                value: '文具',
                checked: false
            },
            {
                id: 2,
                value: '饮料',
                checked: false
            },
            {
                id: 3,
                value: '小食',
                checked: false
            },
            {
                id: 4,
                value: '小商品',
                checked: false
            }
        ],
        planrange: ['文具', '饮料', '小食', '小商品'],
        chooseplan: false,
        goodsList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function() {
        var goodsList = app.globalData.goodList
        this.setData({
            goodsList
        })
        let pages = getCurrentPages();
        let currentPage = pages[pages.length - 1];
        let options = currentPage.options;
        var that = this;
        var goodsObj = JSON.parse(options.goods_info);
        if (this.data.chooseImgs != '') {
            goodsObj.pic = this.data.chooseImgs;
        }
        that.setData({
            goodsObj: goodsObj,
            chooseImgs: goodsObj.pic
        })
    },
    //更换图片
    ChangeImage() {
        // 2 调用小程序内置的选择图片api
        wx.chooseImage({
            // 同时选中的图片的数量
            count: 1,
            // 图片的格式  原图  压缩
            sizeType: ['original', 'compressed'],
            // 图片的来源  相册  照相机
            sourceType: ['album', 'camera'],
            success: (result) => {

                this.setData({
                    // 图片数组 进行拼接 
                    chooseImgs: result.tempFilePaths,
                    imgchange: true,
                })
            }
        });
    },

    formSubmit: function(e) {
        // console.log(e);
        var that = this;
        var filepath = that.data.chooseImgs;
        var oldid = that.data.goodsObj.id;
        // console.log(filepath);
        if (e.detail.value.name != '') {
            var newname = e.detail.value.name;
        } else {
            var newname = that.data.goodsObj.name
        };
        if (e.detail.value.num != '') {
            var newnum = e.detail.value.num;
        } else {
            var newnum = that.data.goodsObj.num
        };
        if (e.detail.value.pricein != '') {
            var newpricein = e.detail.value.pricein;
        } else {
            var newpricein = that.data.goodsObj.pricein
        };
        if (e.detail.value.priceout != '') {
            var newpriceout = e.detail.value.priceout;
        } else {
            var newpriceout = that.data.goodsObj.priceout
        };
        if (that.data.chooseplan == true) {
            var newcate = that.data.planradio[this.data.planindex].id;
        } else {
            var newcate = that.data.goodsObj.cate;
        };


        for (var i = 0; i < that.data.goodsList.length; i++) {
            if (that.data.goodsList[i].id == oldid) {
                var index = i;
                this.setData({
                    goodsObj: {
                        id: oldid,
                        pic: filepath,
                        name: newname,
                        num: newnum,
                        pricein: newpricein,
                        priceout: newpriceout,
                        cate: newcate,
                    }
                })
                app.globalData.goodList.splice(index, 1, this.data.goodsObj)
                wx.setStorageSync("goodList", app.globalData.goodList);
                wx.showToast({
                    title: '修改成功',
                    icon: 'success',
                    duration: 1000,
                });
                setTimeout(function() {
                    //要延时执行的代码
                    wx.navigateBack({
                        delta: 2
                    });
                }, 1000)
            }
        }
        // console.log(name)
    },
    bindplanChange: function(e) {
        // console.log(this.data.planrange)
        var index = e.detail.value;
        var res = this.data.planradio[index].value;
        this.setData({
            planindex: index,
            plan: res,
            chooseplan: true
        })
    }
})