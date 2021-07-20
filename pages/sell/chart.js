// pages/sell/chart.js
var app = getApp();
var wxCharts = require('../../utils/wxcharts.js');
var lineChart = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sellstatus: [],
        choosestartdate: false,
        chooseenddate: false,
        startdate: "",
        enddate: "",
        lr: 0,
        xse: 0,
        xscb: 0,
        qtsr: 0,
        qtzc: 0,
        search: false,
        chartname: "lr",
        textcolor1: '#014f8e',
        textcolor2: '#bfbfbf',
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        var sellstatus = app.globalData.sellstatus;
        this.setData({
            sellstatus
        })
    },

    bindstartDateChange: function(e) {
        if (e.detail.value == "2021-06-10") {
            // console.log(e);

        }
        this.setData({
            startdate: e.detail.value,
            choosestartdate: true
        })
    },
    bindendDateChange: function(e) {
        this.setData({
            enddate: e.detail.value,
            chooseenddate: true
        })
    },
    changechart: function(e) {
        // console.log(e)
        var chartname = e.currentTarget.id;
        this.setData({
                chartname,
            })
            // console.log(this.data.chartname)
    },
    searchstatus: function() {
        if (this.data.chooseenddate == true && this.data.choosestartdate == true) {
            var chartname = this.data.chartname;
            var startdate = this.data.startdate;
            var enddate = this.data.enddate;
            var sellstatus = this.data.sellstatus;
            var x_data = [];
            var y_data = [];
            var startdateindex = -1;
            var enddateindex = -1;
            for (var i = 0; i < sellstatus.length; i++) {
                if (sellstatus[i].date == startdate) {
                    startdateindex = i;
                }
            }
            for (var j = 0; j < sellstatus.length; j++) {
                if (sellstatus[j].date == this.data.enddate) {
                    enddateindex = j;
                }
            }
            var k = 0;
            for (var i = startdateindex; i <= enddateindex; i++, k++) {
                x_data[k] = sellstatus[i].date;
            }

            this.setData({
                search: true,
            })
            console.log(chartname);
            if (chartname == 'lr') {
                var showchartname = '利润'
                var k = 0;
                for (var i = startdateindex; i <= enddateindex; i++, k++) {
                    y_data[k] = sellstatus[i].lr;
                }
            } else if (chartname == 'xse') {
                var showchartname = '销售额'
                var k = 0;
                for (var i = startdateindex; i <= enddateindex; i++, k++) {
                    y_data[k] = sellstatus[i].xse;
                }
            } else if (chartname == 'xscb') {
                var showchartname = '销售成本'
                var k = 0;
                for (var i = startdateindex; i <= enddateindex; i++, k++) {
                    y_data[k] = sellstatus[i].xscb;
                }
            } else if (chartname == 'qtsr') {
                var showchartname = '其他收入'
                var k = 0;
                for (var i = startdateindex; i <= enddateindex; i++, k++) {
                    y_data[k] = sellstatus[i].qtsr;
                }
            } else if (chartname == 'qtzc') {
                var showchartname = '其他支出'
                var k = 0;
                for (var i = startdateindex; i <= enddateindex; i++, k++) {
                    y_data[k] = sellstatus[i].qtzc;
                }
            }
            this.OnWxChart(x_data, y_data, showchartname)
        } else {
            wx.showToast({
                title: '请选择起止日期',
                icon: 'error',
                duration: 1000,
            });
        }
    },

    //图表点击事件
    touchcanvas: function(e) {
        lineChart.showToolTip(e, {
            format: function(item, category) {
                return category + ' ' + item.name + ':' + item.data
            }
        });
    },
    //折线图绘制方法
    OnWxChart: function(x_data, y_data, name) {
        var windowWidth = '',
            windowHeight = ''; //定义宽高
        try {
            var res = wx.getSystemInfoSync(); //试图获取屏幕宽高数据
            windowWidth = res.windowWidth / 750 * 690; //以设计图750为主进行比例算换
            windowHeight = res.windowWidth / 750 * 550 //以设计图750为主进行比例算换
        } catch (e) {
            console.error('getSystemInfoSync failed!'); //如果获取失败
        }
        lineChart = new wxCharts({
            canvasId: 'lineCanvas', //输入wxml中canvas的id
            type: 'line',
            categories: x_data, //模拟的x轴横坐标参数
            animation: true, //是否开启动画

            series: [{
                name: name,
                data: y_data,
                format: function(val, name) {
                    return val + '元';
                }
            }],
            xAxis: { //是否隐藏x轴分割线
                disableGrid: true,
            },
            yAxis: { //y轴数据
                title: '', //标题
                format: function(val) { //返回数值
                    return val.toFixed(2);
                },
                min: 400000.00, //最小值
                gridColor: '#D8D8D8',
            },
            width: windowWidth * 1.1, //图表展示内容宽度
            height: windowHeight, //图表展示内容高度
            dataLabel: false, //是否在图表上直接显示数据
            dataPointShape: true, //是否在图标上显示数据点标志
            extra: {
                lineStyle: 'Broken' //曲线
            },
        });
    }
})