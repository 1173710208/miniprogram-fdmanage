Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsObj: {},
        // 被选中的图片路径 数组
        chooseImgs: '',
        imgchange: false,
    },

    // 外网的图片的路径数组
    UpLoadImgs: '',

    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function() {
        let pages = getCurrentPages();
        let currentPage = pages[pages.length - 1];
        let options = currentPage.options;
        var that = this;
        var goodsObj = JSON.parse(options.assistantcate_info);
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
        console.log(filepath);
        if (e.detail.value.name != '') {
            var newname = e.detail.value.name;
        } else {
            var newname = that.data.goodsObj.name
        };
        // console.log(name)
        wx.showModal({
            title: '',
            content: '是否确认保存',
            success(res) {
                if (res.confirm) {
                    wx.request({
                        url: '', //仅为示例，非真实的接口地址
                        header: {
                            'Content-Type': 'application/json'
                        },
                        method: "POST",
                        data: { name: newname },
                        success: function(res) {
                            if (that.data.imgchange) {
                                wx.uploadFile({
                                    url: '', //仅为示例，非真实的接口地址
                                    filePath: filepath,
                                    name: 'file',
                                    formData: {
                                        user: 'test',
                                        // image: 'file',
                                        // apiType: 'ali,huluxia',
                                        // token: '0d79e3fdb2385d77c6982927bead040b'
                                    },
                                    success: function(res) {
                                        console.log(filepath);
                                        console.log(res);
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
                                            // const data = res.data;
                                            //更改信息 和 外网的图片的路径 一起提交到服务器保存新数据到数据库

                                    },
                                    fail: function(res) {
                                        wx.showToast({
                                            title: '上传图片失败',
                                            icon: 'fail',
                                            duration: 1000,
                                        });
                                    }
                                })
                            } else {
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
                        },
                        fail: function(res) {
                            wx.showToast({
                                title: '上传信息失败',
                                icon: 'error',
                                duration: 1000,
                            });
                        }
                    })

                    // 图片上传到专门的图片的服务器 返回图片外网的链接
                    // wx.request({
                    //     url: url,
                    //     method: 'POST',
                    //     data: {
                    //         image: 'file',
                    //         apiType: 'ali,huluxia',
                    //         token: '0d79e3fdb2385d77c6982927bead040b'
                    //     },
                    //     success: (res) => {
                    //         console.log(res);
                    //         that.setData({
                    //                 goodsObj: {
                    //                     id: id,
                    //                     name: name,
                    //                     pics: res[0]
                    //                 }
                    //             })
                    //             // console.log(that.data.goodsObj);                            
                    //     }
                    // })

                } else if (res.cancel) {

                    // console.log('用户点击取消');

                }
            }
        })
    }
})