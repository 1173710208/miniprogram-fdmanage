var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        chooseImgs: 'https://www.hualigs.cn/image/60be37755fd6a.jpg',
        //性别radio
        planradio: [{
                id: 1,
                value: '小说',
                checked: false
            },
            {
                id: 2,
                value: '学习',
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
        isbn: '',
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        let pages = getCurrentPages();
        let currentPage = pages[pages.length - 1];
        let options = currentPage.options;
        // console.log(options)
        const { isbn } = options;
        var booksList = app.globalData.booksList;
        var newid = 1;
        for (var i = 0; i < booksList.length; i++) {
            if (booksList[i].id >= newid) {
                newid = booksList[i].id;
            }
        }

        this.setData({
            booksList,
            isbn,
            newid
        })

        this.isbn(isbn);
    },

    isbn: function(isbn) {
        var that = this;
        wx.request({
            url: 'https://api.jisuapi.com/isbn/query',
            data: { //参数为json格式数据
                isbn: isbn,
                appkey: 'f82332a80d81bbfc'
            },
            success: function(res) {
                console.log(res.data.result);
                var newpic = res.data.result.pic;
                var newtitle = res.data.result.title;
                var newauthor = res.data.result.author;
                var newsummary = res.data.result.summary;
                var newpublisher = res.data.result.publisher;
                var newisbn = res.data.result.isbn;

                var booksinfo = {};
                booksinfo.id = that.data.newid + 1;
                booksinfo.pic = newpic;
                booksinfo.title = newtitle;
                booksinfo.author = newauthor;
                booksinfo.summary = newsummary;
                booksinfo.publisher = newpublisher;
                booksinfo.isbn = newisbn;
                that.setData({
                    booksinfo
                })
            }
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
                    chooseImgs: result.tempFilePaths
                })
            }
        });
    },


    formSubmit: function(e) {
        // console.log(e);
        var that = this;
        var filepath = that.data.filepath;
        var newbooksList = {};
        // console.log(filepath);
        if (e.detail.value.stock != '' && e.detail.value.pricein != '' && e.detail.value.priceout != '' && e.detail.value.cate != '') {
            var newid = this.data.booksinfo.id;
            var newpic = this.data.booksinfo.pic;
            var newtitle = this.data.booksinfo.title;
            var newauthor = this.data.booksinfo.author;
            var newsummary = this.data.booksinfo.summary;
            var newpublisher = this.data.booksinfo.publisher;
            var newisbn = this.data.booksinfo.isbn;

            var newstock = e.detail.value.stock;
            var newpricein = e.detail.value.pricein;
            var newpriceout = e.detail.value.priceout;
            var newcate = this.data.planradio[this.data.planindex].id;

        } else {
            wx.showToast({
                title: '信息未填写完整',
                icon: 'none',
                duration: 1000,
            });
            return;
        };
        newbooksList.id = newid;

        newbooksList.pic = newpic;
        newbooksList.title = newtitle;
        newbooksList.author = newauthor;
        newbooksList.summary = newsummary;
        newbooksList.publisher = newpublisher;
        newbooksList.stock = newstock;
        newbooksList.pricein = newpricein;
        newbooksList.priceout = newpriceout;
        newbooksList.isbn = newisbn;
        newbooksList.cate = newcate;

        this.setData({
            newbooksList
        })

        this.data.booksList.push(newbooksList);
        app.globalData.booksList = this.data.booksList;
        wx.setStorageSync("booksList", this.data.booksList);
        app.globalData.booksnum = app.globalData.booksnum + 1;

        wx.showToast({
            title: '保存成功',
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