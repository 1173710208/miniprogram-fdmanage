// pages/settings/settings.js
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        user: {
            id: 0,
            name: '曾智',
            sex: '男',
            phonenum: '18800416241',
            post: '管理员',
            date: '2021 - 01 - 01',
        }
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },


    // 退出登录
    logout() {
        wx.showModal({
            title: '',
            content: '是否确认退出登录',
            success(res) {
                if (res.confirm) {
                    // console.log('用户点击确定');
                    wx.showToast({
                        title: '退出成功',
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
    }
})