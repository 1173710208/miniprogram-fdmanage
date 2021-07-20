// pages/goods/goodscate.js
var util = require('../../utils/util.js');
var api = require('../../config/api.js');

var app = getApp()
Page({
    data: {
        // 取消 按钮 是否显示
        isFocus: false,
        // 输入框的值
        inpValue: "",
        //全部数据
        goodsList: [],
        //搜索后数据
        searchgoodsList: [],
        //搜索状态
        searchStatus: false,
    },

    //防抖
    TimeId: -1,

    onShow: function() {
        // 
        // const url = "http://localhost/PHP/goodscate.php"; //示例接口，非实际接口
        // console.log(url);
        // wx.request({
        //     url: url,
        //     success: res => {
        //         console.log(res.data)
        //         this.setData({
        //             goodsList: res.data
        //         })
        //     }
        // })

        //demo
        this.setData({
            goodsList: [{
                    id: 1,
                    name: '文具',
                    pics: 'https://www.hualigs.cn/image/60be3a00656ef.jpg',
                },
                {
                    id: 2,
                    name: '饮料',
                    pics: 'https://www.hualigs.cn/image/60be3a00656ef.jpg',
                },
                {
                    id: 3,
                    name: '小食',
                    pics: 'https://www.hualigs.cn/image/60be3a00656ef.jpg',
                },
                {
                    id: 4,
                    name: '小商品',
                    pics: 'https://www.hualigs.cn/image/60be3a00656ef.jpg',
                }
            ],
        })


        //存入本地缓存
        var goodscatestorage = this.data.goodsList;
        wx.setStorageSync('goodscatestorage', goodscatestorage);
        // console.log(this.data);
    },

    // 输入框的值改变 就会触发的事件
    handleInput(e) {
        // 1 获取输入框的值
        const { value } = e.detail;
        // 2 检测合法性
        if (!value.trim()) {
            clearTimeout(this.TimeId);
            this.setData({
                searchgoodsList: [],
                isFocus: false,
                searchStatus: false,
            })
            console.log(this.data);
            // 值不合法
            return;
        }
        // 3 准备发送请求获取数据
        this.setData({
                isFocus: true,
                inpValue: value,
            })
            // console.log(this.data);
        clearTimeout(this.TimeId);
        this.TimeId = setTimeout(() => {
            this.qsearch(value);
        }, 1000);
    },

    //总页数
    // totalPage: 1,

    //清除输入框
    clearKeyword: function() {
        this.setData({
            inpValue: "",
            isFocus: false,
            searchgoodsList: [],
            searchStatus: false,
        });
        // console.log(this.data);
    },

    //搜索请求发送
    qsearch(value) {
        // console.log(value);
        // const url = "http://localhost/PHP/search.php?value=" + value;
        // console.log(url);
        // wx.request({
        //     url: url,
        //     success: res => {
        //         console.log(res.data)
        //         this.setData({
        //             searchgoodsList: res.data,
        //             searchStatus: true,
        //         })
        //     }
        // })

        //demo
        this.setData({
                searchgoodsList: [{
                    id: 4,
                    name: '膨化食品',
                    pics: 'https://www.hualigs.cn/image/60be3a00656ef.jpg',
                }],
                searchStatus: true,
            })
            // console.log(this.data);


    },
})