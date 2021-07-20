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
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        var goodList = app.globalData.goodList;
        var newid = 1;
        this.setData({
            goodList
        })
        for (var i = 0; i < goodList.length; i++) {
            if (goodList[i].id >= newid) {
                newid = goodList[i].id;
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
            }
        });
    },


    formSubmit: function(e) {
        // console.log(e);
        var newgoodList = {};
        // console.log(filepath);
        if (e.detail.value.name != '' && e.detail.value.num != '' && e.detail.value.pricein != '' &&
            e.detail.value.priceout != '' && e.detail.value.cate != '') {
            var newname = e.detail.value.name;
            var newnum = e.detail.value.num;
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
        newgoodList.id = this.data.newid + 1;
        newgoodList.pic = this.data.chooseImgs;

        newgoodList.name = newname;
        newgoodList.num = newnum;
        newgoodList.pricein = newpricein;
        newgoodList.priceout = newpriceout;
        newgoodList.cate = newcate;

        this.setData({
            newgoodList
        })

        this.data.goodList.push(newgoodList);
        app.globalData.goodList = this.data.goodList;
        wx.setStorageSync("goodList", this.data.goodList);
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