// pages/bookstoresettings/change.js
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var app = getApp();

Page({
    data: {
        bookstoresettings: {},
    },
    onShow: function() {
        let pages = getCurrentPages();
        let currentPage = pages[pages.length - 1];
        let options = currentPage.options;
        var that = this;
        var bookstoresettings = JSON.parse(options.info);
        that.setData({
                bookstoresettings: bookstoresettings
            })
            // console.log(that.data.bookstoresettings);
    },


    formSubmit: function(e) {
        // console.log(e);
        var name = e.detail.value.name;
        var shopkeeper = e.detail.value.shopkeeper;
        var phonenum = e.detail.value.phonenum;
        var wechat = e.detail.value.wechat;
        var email = e.detail.value.email;
        var abstract = e.detail.value.abstract;
        var address = e.detail.value.address;
        if (name != '') {
            name = e.detail.value.name;
        } else {
            name = this.data.bookstoresettings.name
        }
        if (shopkeeper != '') {
            shopkeeper = e.detail.value.shopkeeper;
        } else {
            shopkeeper = this.data.bookstoresettings.shopkeeper
        }
        if (phonenum != '') {
            phonenum = e.detail.value.phonenum;
        } else {
            phonenum = this.data.bookstoresettings.phonenum
        }
        if (wechat != '') {
            wechat = e.detail.value.wechat;
        } else {
            wechat = this.data.bookstoresettings.wechat
        }
        if (email != '') {
            email = e.detail.value.email;
        } else {
            email = this.data.bookstoresettings.email
        }
        if (abstract != '') {
            abstract = e.detail.value.abstract;
        } else {
            abstract = this.data.bookstoresettings.abstract
        }
        if (address != '') {
            address = e.detail.value.address;
        } else {
            address = this.data.bookstoresettings.address
        }
        // var no = wx.getStorageSync('student').no;
        // console.log(no);
        var isnum = /^\d+$/.test(phonenum);
        if (!isnum && phonenum != '') {
            wx.showToast({
                title: '??????????????????',
                icon: 'error',
                duration: 1000
            })
        } else {
            wx.showModal({
                    title: '',
                    content: '??????????????????',
                    success: (res) => {
                        if (res.confirm) {
                            // console.log('??????????????????');
                            //demo???????????????????????????
                            this.setData({
                                bookstoresettings: {
                                    name: name,
                                    shopkeeper: shopkeeper,
                                    phonenum: phonenum,
                                    wechat: wechat,
                                    email: email,
                                    abstract: abstract,
                                    address: address,
                                }
                            })
                            console.log(this.data.bookstoresettings);
                            var newbookstoresettings = this.data.bookstoresettings;
                            wx.setStorageSync('bookstoresettings', newbookstoresettings);
                            wx.showToast({
                                title: '????????????',
                                icon: 'success',
                                duration: 1000,
                            });
                            setTimeout(function() {
                                //????????????????????????
                                wx.navigateBack({
                                    delta: 1
                                });
                            }, 1000)

                        } else if (res.cancel) {
                            // console.log('??????????????????');
                        }
                    }
                })
                // var url = app.globalData.url.setpassword;
                // wx.request({
                //     url: url, //??????????????????????????????????????????
                //     method: 'POST',
                //     data: {
                //         no: no,
                //         oldpwd: oldpwd,
                //         newpwd: newpwd
                //     },
                //     header: {
                //         'content-type': 'application/x-www-form-urlencoded'
                //     },
                //     success: (res) => {
                //         console.log(res.data);
                //         if (res.data.error) {
                //             wx.showToast({
                //                 title: res.data.msg,
                //                 icon: 'none',
                //                 duration: 2000
                //             })
                //         } else {
                //             wx.showToast({
                //                 title: res.data.msg,
                //                 icon: 'success',
                //                 duration: 2000,
                //                 success: function() {
                //                     setTimeout(function() {
                //                         wx.navigateBack({ belta: 1 })
                //                     }, 2000)
                //                 }
                //             })
                //         }

            //     }
            // })
        }

        console.log(this.data);
    },

    // ??????
    cancel() {
        wx.navigateBack({
            delta: 1
        });
    }
})