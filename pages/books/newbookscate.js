// pages/books/newbookscate.js
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        chooseImgs: 'https://www.hualigs.cn/image/60be37755fd6a.jpg',
        filepath: '',
        newbookscate: {},
        bookscateList: [],
        newid: 1,

    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        var bookscateList = app.globalData.bookscateList;
        var newid = 1;
        this.setData({
            bookscateList
        })
        for (var i = 0; i < bookscateList.length; i++) {
            if (bookscateList[i].id >= newid) {
                newid = bookscateList[i].id;
            }
        }
        this.setData({
            newid
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
                    // console.log(this.data.chooseImgs)
            }
        });
    },


    formSubmit: function(e) {
        // console.log(e);

        var that = this;
        var filepath = that.data.filepath;
        var newbookscate = {};
        // console.log(filepath);
        if (e.detail.value.name != '') {
            var newname = e.detail.value.name;
        } else {
            wx.showToast({
                title: '未填写种类名称',
                icon: 'none',
                duration: 1000,
            });
            return;
        };
        newbookscate.id = this.data.newid + 1;
        newbookscate.name = newname;
        newbookscate.pics = this.data.chooseImgs;
        this.setData({
            newbookscate
        })
        this.data.bookscateList.push(newbookscate);
        app.globalData.bookscateList = this.data.bookscateList;
        wx.setStorageSync("bookscateList", this.data.bookscateList)
            // console.log(app.globalData.bookscateList)
        wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 1000,
        });
        setTimeout(function() {
            //要延时执行的代码
            wx.navigateBack({
                delta: 1
            });
        }, 1000)

    }
})