var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        var outList = app.globalData.outList;
        var newid = 1;
        this.setData({
            outList
        })
        for (var i = 0; i < outList.length; i++) {
            if (outList[i].id >= newid) {
                newid = outList[i].id;
            }
        }
        this.setData({
            newid
        })

    },


    formSubmit: function(e) {
        // console.log(e);
        var newoutList = {};
        // console.log(filepath);
        if (e.detail.value.reason != '' && e.detail.value.price != '') {

            var newprice = e.detail.value.price;
            var newreason = e.detail.value.reason;

        } else {
            wx.showToast({
                title: '信息未填写完整',
                icon: 'none',
                duration: 1000,
            });
            return;
        };
        newoutList.id = this.data.newid + 1;

        newoutList.price = newprice;
        newoutList.reason = newreason;
        newoutList.date = "2021-06-11"

        this.setData({
            newoutList
        })

        this.data.outList.push(newoutList);
        app.globalData.outList = this.data.outList;
        wx.setStorageSync("outList", this.data.outList);
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
})