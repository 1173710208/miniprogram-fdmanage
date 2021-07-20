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
        planrange: ['一年制普通会员', '两年制普通会员', '三年制普通会员', '一年制超级会员', '两年制超级会员', '三年制超级会员'],
        sexrange: ['女', '男'],
        choosebirthday: false,
        choosesex: false,
        chooseplan: false,
        sexradio: [{
            id: 0,
            value: '女',
            checked: false
        }, {
            id: 1,
            value: '男',
            checked: false
        }, ],
    },

    // 外网的图片的路径数组
    UpLoadImgs: '',

    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function() {
        var goodsList = app.globalData.customerList
        this.setData({
            goodsList
        })
        let pages = getCurrentPages();
        let currentPage = pages[pages.length - 1];
        let options = currentPage.options;
        var that = this;
        var goodsObj = JSON.parse(options.customer_info);
        if (this.data.chooseImgs != '') {
            goodsObj.pic = this.data.chooseImgs;
        }
        that.setData({
            goodsObj: goodsObj,
            chooseImgs: goodsObj.pics
        })
        this.getplancateradio();
    },
    getplancateradio: function() {
        var plan = app.globalData.plan;
        var planradio = [];
        for (var i = 0; i < plan.length; i++) {
            let object = { id: 0, value: "", checked: false };
            object.id = plan[i].id;
            object.value = plan[i].name;
            object.checked = false;
            planradio[i] = object;
        }
        this.setData({
            planradio,
            plan,
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
        var oldday = that.data.goodsObj.day;
        console.log(filepath);
        if (e.detail.value.name != '') {
            var newname = e.detail.value.name;
        } else {
            var newname = that.data.goodsObj.name
        };
        if (e.detail.value.phonenum != '') {
            var newphonenum = e.detail.value.phonenum;
        } else {
            var newphonenum = that.data.goodsObj.phonenum
        };
        if (e.detail.value.mm != '') {
            var newpassword = e.detail.value.mm;
        } else {
            var newpassword = that.data.goodsObj.password;
        };
        if (that.data.choosesex == true) {
            var newgender = that.data.sexradio[this.data.sexindex].id;
        } else {
            var newgender = that.data.goodsObj.gender;
        };
        if (that.data.chooseplan == true) {
            var newplan = that.data.planradio[this.data.planindex].id;
        } else {
            var newplan = that.data.goodsObj.plan;
        };
        if (that.data.choosebirthday == true) {
            var newbirthday = this.data.date;
        } else {
            var newbirthday = that.data.goodsObj.birthday;
        };


        for (var i = 0; i < that.data.goodsList.length; i++) {
            if (that.data.goodsList[i].id == oldid) {
                var index = i;
                this.setData({
                    goodsObj: {
                        id: oldid,
                        phonenum: newphonenum,
                        name: newname,
                        pics: filepath,
                        gender: newgender,
                        password: newpassword,
                        birthday: newbirthday,
                        plan: newplan,
                        day: oldday,
                    }
                })
                app.globalData.customerList.splice(index, 1, this.data.goodsObj)
                wx.setStorageSync("customerList", app.globalData.customerList);
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
    bindDateChange: function(e) {
        this.setData({
            date: e.detail.value,
            choosebirthday: true
        })
    },
    bindsexChange: function(e) {
        var index = e.detail.value;
        var res = this.data.sexradio[index].value;
        this.setData({
            sexindex: index,
            sex: res,
            choosesex: true
        })
        console.log
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