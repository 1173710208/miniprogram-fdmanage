//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        username: '',
        password: '',
        loginmm: '',
        loginzh: '1',
    },

    // 生命周期函数--监听页面显示
    onShow: function() {
        var oldmm = wx.getStorageSync('loginmm') || '';
        // console.log(loginmm);
        var mm = '111';
        if (oldmm == '') {
            wx.setStorageSync('loginmm', mm);
        }
        var loginmm = wx.getStorageSync('loginmm');
        this.setData({
            loginmm
        })
    },

    // 获取输入账号 
    usernameInput: function(e) {
        this.setData({
                username: e.detail.value
            })
            // console.log(this.data.username);
    },

    // 获取输入密码 
    passwordInput: function(e) {
        this.setData({
                password: e.detail.value
            })
            // console.log(this.data.password);
    },

    // 登录处理
    login: function() {
        var that = this;
        if (this.data.username.length == 0 || this.data.password.length == 0) {
            wx.showToast({
                title: '账号或密码不能为空',
                icon: 'error',
                duration: 2000
            })
        } else {
            if (this.data.username != this.data.loginzh) {
                wx.showToast({
                    title: '账号不存在',
                    icon: 'error',
                    duration: 2000
                })
            } else if (this.data.password != this.data.loginmm) {
                wx.showToast({
                    title: '密码错误',
                    icon: 'error',
                    duration: 2000
                })
            } else {
                wx.switchTab({
                    url: '/pages/index/index'
                })
            }
            // wx.request({
            //     url: app.globalData.globalReqUrl + '/login/login', // 仅为示例，并非真实的接口地址
            //     method: 'post',
            //     data: {
            //         username: that.data.username,
            //         password: that.data.password
            //     },
            //     header: {
            //         'content-type': 'application/x-www-form-urlencoded' // 默认值
            //     },
            //     success(res) {
            //         if (res.data.code == "OK") {
            //             var unitName = res.data.data.User.unitName;
            //             var unitId = res.data.data.User.unitId;
            //             wx.setStorageSync('unitId', unitId);
            //             wx.setStorageSync('unitName', unitName);
            //             wx.switchTab({
            //                 url: '../overviewData/realTimeData'
            //             })
            //         } else {
            //             wx.showToast({
            //                 title: res.data.message,
            //                 icon: 'none',
            //                 duration: 2000
            //             })
            //         }
            //     }
            // })
        }
    }
})