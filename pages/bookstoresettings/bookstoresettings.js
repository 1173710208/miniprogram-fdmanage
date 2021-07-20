// pages/bookstoresettings/bookstoresettings.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bookstoresettings: {},
    },

    isEmptyObject(obj) {
        for (var key in obj) {
            return false;
        }
        return true;
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        var oldbookstoresettings = wx.getStorageSync('bookstoresettings') || '';

        // console.log(oldbookstoresettings);
        if (oldbookstoresettings == '') {
            this.setData({
                    bookstoresettings: {
                        name: '樊登读书（哈尔滨江北店）',
                        shopkeeper: '孙强',
                        phonenum: '18904884031',
                        wechat: 'sq18904884031',
                        email: '18904884031@163.com',
                        abstract: '帮助三亿国人养成阅读习惯',
                        address: '哈尔滨市学院路756号财富天地三楼',
                    }
                })
                // console.log(this.data.bookstoresettings);
            var nowbookstoresettings = this.data.bookstoresettings;
            wx.setStorageSync('bookstoresettings', nowbookstoresettings);
        } else {
            this.setData({
                bookstoresettings: {
                    name: oldbookstoresettings.name,
                    shopkeeper: oldbookstoresettings.shopkeeper,
                    phonenum: oldbookstoresettings.phonenum,
                    wechat: oldbookstoresettings.wechat,
                    email: oldbookstoresettings.email,
                    abstract: oldbookstoresettings.abstract,
                    address: oldbookstoresettings.address,
                }
            })
            console.log(this.data.bookstoresettings);
        }
    },

    //编辑跳转函数
    edit() {
        var that = this;
        //将对象转为string
        var queryBean = JSON.stringify(that.data.bookstoresettings);
        wx.navigateTo({
            url: '/pages/bookstoresettings/change?info=' + queryBean,
        })
    },

})