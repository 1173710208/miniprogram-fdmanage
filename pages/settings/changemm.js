// pages/settings/changemm.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mm: '',
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        var mm = wx.getStorageSync('loginmm');
        // console.log(mm);
        this.setData({
            mm
        })
    },

    formSubmit: function(e) {
        // console.log(e);
        var mima = this.data.mm;
        console.log(mima);
        var oldpwd = e.detail.value.oldpwd;
        var newpwd = e.detail.value.newpwd;
        var newpwd2 = e.detail.value.newpwd2;
        // var no = wx.getStorageSync('student').no;
        // console.log(no);
        if (oldpwd == '') {
            wx.showToast({
                title: '原密码不能为空',
                icon: 'error',
                duration: 1000
            })
        } else if (newpwd == '') {
            wx.showToast({
                title: '新密码不能为空',
                icon: 'error',
                duration: 1000
            })
        } else if (newpwd2 == '') {
            wx.showToast({
                title: '请确认新密码',
                icon: 'error',
                duration: 1000
            })
        } else if (newpwd != newpwd2) {
            wx.showToast({
                title: '两次新密码输入不一致',
                icon: 'error',
                duration: 1000
            })
        } else if (oldpwd != mima) {
            wx.showToast({
                title: '原密码错误',
                icon: 'error',
                duration: 1000
            })
        } else {
            wx.showModal({
                title: '',
                content: '是否确认修改密码',
                success: (res) => {
                    if (res.confirm) {
                        // console.log('用户点击确定');
                        //保存新数据到数据库

                        wx.setStorageSync('loginmm', newpwd);
                        wx.showToast({
                            title: '修改成功',
                            icon: 'success',
                            duration: 1000,
                        });
                        setTimeout(function() {
                            //要延时执行的代码
                            wx.reLaunch({
                                url: '/pages/login/login',
                            });
                        }, 1000)

                    } else if (res.cancel) {
                        // console.log('用户点击取消');
                    }
                }
            })

            // var url = app.globalData.url.setpassword;
            // wx.request({
            //     url: url, //仅为示例，并非真实的接口地址
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
        // console.log(this.data.mm);
    },
})