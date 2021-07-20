var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        chooseImgs: 'https://www.hualigs.cn/image/60be37755fd6a.jpg',
        //性别radio
        sexradio: [{
            id: 0,
            value: '女',
            checked: false
        }, {
            id: 1,
            value: '男',
            checked: false
        }, ],
        sexrange: ['女', '男'],
        planrange: ['一年制普通会员', '两年制普通会员', '三年制普通会员', '一年制超级会员', '两年制超级会员', '三年制超级会员'],
        choosebirthday: false,
        choosesex: false,
        chooseplan: false,
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        var customerList = app.globalData.customerList;
        var newid = 1;
        this.setData({
            customerList
        })
        for (var i = 0; i < customerList.length; i++) {
            if (customerList[i].id >= newid) {
                newid = customerList[i].id;
            }
        }
        this.setData({
            newid
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
                    chooseImgs: result.tempFilePaths
                })
            }
        });
    },


    formSubmit: function(e) {
        // console.log(e);
        var that = this;
        var filepath = that.data.filepath;
        var newcustomerList = {};
        // console.log(filepath);
        if (e.detail.value.name != '' && e.detail.value.sex != '' && e.detail.value.phonenum != '' &&
            e.detail.value.mm != '' && e.detail.value.birthday != '' && e.detail.value.plan != '') {
            var newname = e.detail.value.name;
            var newsex = this.data.sexradio[this.data.sexindex].id;
            var newphonenum = e.detail.value.phonenum;
            var newmm = e.detail.value.mm;
            var newbirthday = this.data.date;
            var newplan = this.data.planradio[this.data.planindex].id;
        } else {
            wx.showToast({
                title: '信息未填写完整',
                icon: 'error',
                duration: 1000,
            });
            return;
        };
        newcustomerList.id = this.data.newid + 1;
        newcustomerList.name = newname;
        newcustomerList.pics = this.data.chooseImgs;
        newcustomerList.gender = newsex;
        newcustomerList.password = newmm;
        newcustomerList.birthday = newbirthday;
        newcustomerList.plan = newplan;
        newcustomerList.phonenum = newphonenum;
        newcustomerList.day = 1;

        this.setData({
            newcustomerList
        })

        this.data.customerList.push(newcustomerList);
        app.globalData.customerList = this.data.customerList;
        wx.setStorageSync("customerList", this.data.customerList);
        app.globalData.customernum = app.globalData.customernum + 1;

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