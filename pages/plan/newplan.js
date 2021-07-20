// pages/books/newL.js
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        chooseImgs: 'https://www.hualigs.cn/image/60be37755fd6a.jpg',
        filepath: '',
        newplan: {},
        plan: [],
        newid: 1,

    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        var plan = app.globalData.plan;
        var newid = 1;
        this.setData({
            plan
        })
        for (var i = 0; i < plan.length; i++) {
            if (plan[i].id >= newid) {
                newid = plan[i].id;
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
        var newplan = {};
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
        newplan.id = this.data.newid + 1;
        newplan.name = newname;
        newplan.pics = this.data.chooseImgs;
        this.setData({
            newplan
        })
        this.data.plan.push(newplan);
        app.globalData.plan = this.data.plan;
        wx.setStorageSync("plan", this.data.plan)
            // console.log(app.globalData.plan)
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

    }
})