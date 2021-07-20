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
        var inList = app.globalData.inList;
        var newid = 1;
        this.setData({
            inList
        })
        for (var i = 0; i < inList.length; i++) {
            if (inList[i].id >= newid) {
                newid = inList[i].id;
            }
        }
        this.setData({
            newid
        })

    },


    formSubmit: function(e) {
        // console.log(e);
        var newinList = {};
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
        newinList.id = this.data.newid + 1;

        newinList.price = newprice;
        newinList.reason = newreason;
        newinList.date = "2021-06-11"

        this.setData({
            newinList
        })

        this.data.inList.push(newinList);
        app.globalData.inList = this.data.inList;
        wx.setStorageSync("inList", this.data.inList);
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