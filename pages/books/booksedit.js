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
                value: '小说',
                checked: false
            },
            {
                id: 2,
                value: '散文',
                checked: false
            },
            {
                id: 3,
                value: '诗歌',
                checked: false
            },
            {
                id: 4,
                value: '说明文',
                checked: false
            },
            {
                id: 5,
                value: '悬疑',
                checked: false
            }
        ],
        planrange: ['小说', '学习', '诗歌', '说明文', '悬疑', ],
        chooseplan: false,
        goodsList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function() {
        var goodsList = app.globalData.booksList
        this.setData({
            goodsList
        })
        let pages = getCurrentPages();
        let currentPage = pages[pages.length - 1];
        let options = currentPage.options;
        var that = this;
        var goodsObj = JSON.parse(options.books_info);
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
        if (e.detail.value.title != '') {
            var newtitle = e.detail.value.title;
        } else {
            var newtitle = that.data.goodsObj.title
        };
        if (e.detail.value.author != '') {
            var newauthor = e.detail.value.author;
        } else {
            var newauthor = that.data.goodsObj.author
        };
        if (e.detail.value.summary != '') {
            var newsummary = e.detail.value.summary;
        } else {
            var newsummary = that.data.goodsObj.summary
        };
        if (e.detail.value.publisher != '') {
            var newpublisher = e.detail.value.publisher;
        } else {
            var newpublisher = that.data.goodsObj.publisher
        };
        if (e.detail.value.stock != '') {
            var newstock = e.detail.value.stock;
        } else {
            var newstock = that.data.goodsObj.stock
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
        if (e.detail.value.isbn != '') {
            var newisbn = e.detail.value.isbn;
        } else {
            var newisbn = that.data.goodsObj.isbn
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
                        title: newtitle,
                        author: newauthor,
                        summary: newsummary,
                        publisher: newpublisher,
                        stock: newstock,
                        pricein: newpricein,
                        priceout: newpriceout,
                        isbn: newisbn,
                        cate: newcate,
                    }
                })
                app.globalData.booksList.splice(index, 1, this.data.goodsObj)
                wx.setStorageSync("booksList", app.globalData.booksList);
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