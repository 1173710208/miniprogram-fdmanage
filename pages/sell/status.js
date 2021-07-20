// pages/sell/status.js
var app = getApp();
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
    searchstatus: function() {
        if (this.data.chooseenddate == true && this.data.choosestartdate == true) {
            var startdate = this.data.startdate;
            var enddate = this.data.enddate;
            var sellstatus = this.data.sellstatus;
            // console.log(sellstatus)
            var startdateindex = -1;
            var enddateindex = -1;
            var lr = 0;
            var xse = 0;
            var xscb = 0;
            var qtsr = 0;
            var qtzc = 0;
            // console.log(sellstatus.length)
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
            if (startdateindex == -1 && enddateindex == -1) {
                lr = 0;
                xse = 0;
                xscb = 0;
                qtsr = 0;
                qtzc = 0;
            } else if (startdateindex != -1 && enddateindex == -1) {
                for (var i = startdateindex; i < sellstatus.length; i++) {
                    lr = lr + sellstatus[i].lr;
                    xse = xse + sellstatus[i].xse;
                    xscb = xscb + sellstatus[i].xscb;
                    qtsr = qtsr + sellstatus[i].qtsr;
                    qtzc = qtzc + sellstatus[i].qtzc;
                }
            } else if (startdateindex == -1 && enddateindex != -1) {
                for (var i = 0; i <= enddateindex; i++) {
                    lr = lr + sellstatus[i].lr;
                    xse = xse + sellstatus[i].xse;
                    xscb = xscb + sellstatus[i].xscb;
                    qtsr = qtsr + sellstatus[i].qtsr;
                    qtzc = qtzc + sellstatus[i].qtzc;
                }
            } else if (startdateindex == enddateindex) {
                lr = lr + sellstatus[startdateindex].lr;
                xse = xse + sellstatus[startdateindex].xse;
                xscb = xscb + sellstatus[startdateindex].xscb;
                qtsr = qtsr + sellstatus[startdateindex].qtsr;
                qtzc = qtzc + sellstatus[startdateindex].qtzc;
            } else if (startdateindex != -1 && enddateindex != -1) {
                for (var i = startdateindex; i <= enddateindex; i++) {
                    lr = lr + sellstatus[i].lr;
                    xse = xse + sellstatus[i].xse;
                    xscb = xscb + sellstatus[i].xscb;
                    qtsr = qtsr + sellstatus[i].qtsr;
                    qtzc = qtzc + sellstatus[i].qtzc;
                }
            }
            this.setData({
                    lr,
                    xse,
                    xscb,
                    qtsr,
                    qtzc,
                    search: true,
                })
                // console.log(startdateindex, enddateindex);
                // console.log(startdate, enddate);
                // console.log(lr, xse, xscb, qtsr, qtzc, );
        } else {
            wx.showToast({
                title: '请选择起止日期',
                icon: 'error',
                duration: 1000,
            });
        }
    }
})