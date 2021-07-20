// pages/books/bookscateedit.js
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
        goodsList: [],
    },

    // 外网的图片的路径数组
    UpLoadImgs: '',

    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function() {
        var goodsList = app.globalData.bookscateList
        this.setData({
            goodsList
        })
        let pages = getCurrentPages();
        let currentPage = pages[pages.length - 1];
        let options = currentPage.options;
        var that = this;
        var goodsObj = JSON.parse(options.bookscate_info);
        if (this.data.chooseImgs != '') {
            goodsObj.pics = this.data.chooseImgs;
        }
        that.setData({
                goodsObj: goodsObj,
                chooseImgs: goodsObj.pics
            })
            // console.log(that.data.goodsObj);
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
        console.log(filepath);
        if (e.detail.value.name != '') {
            var newname = e.detail.value.name;
        } else {
            var newname = that.data.goodsObj.name
        };

        for (var i = 0; i < that.data.goodsList.length; i++) {
            if (that.data.goodsList[i].id == oldid) {
                var index = i;
                this.setData({
                    goodsObj: {
                        pics: filepath,
                        name: newname,
                        id: oldid
                    }
                })
                app.globalData.bookscateList.splice(index, 1, this.data.goodsObj)
                wx.setStorageSync("bookscateList", app.globalData.bookscateList);
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
    }
})