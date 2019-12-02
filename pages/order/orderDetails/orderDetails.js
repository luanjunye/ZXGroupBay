// pages/order/orderDetails/orderDetails.js
const api = require('../../../config/url.js');
const util = require('../../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderId: "",
        product: {},
        failPayTime:0

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let orderId = options.orderId

        if (orderId) {
            this.setData({
                orderId: orderId
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let that = this
        //获取订单详情
        util.request(api.OrderInfo, {id: this.data.orderId}, "POST").then(function (res) {
            let timeStamp = util.getTimeStamp()
            let failPayTime = res.failPayTime - timeStamp
            that.setData({
                product: res,
                failPayTime : failPayTime
            });
        });
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    
    //去支付
    toPay:function () {
        let orderId = this.data.orderId
        if(orderId){
            util.request(api.Pay, {
                id: orderId,
            }, "POST").then(function (res) {
                console.log(res);
                if (res) {
                    let entity = res;
                    wx.requestPayment({
                        timeStamp: entity.timeStamp,
                        nonceStr: entity.nonceStr,
                        package: entity.package,
                        signType: entity.signType,
                        paySign: entity.sign,
                        success(res) {
                            wx.showToast({
                                title: '支付成功',
                            });
                            setTimeout(function () {
                                wx.navigateTo({
                                    url: '/pages/order/orderCenter/orderCenter',
                                })
                            }, 1500);
                        },
                        fail(res) {
                            wx.navigateTo({
                                url: '/pages/order/orderCenter/orderCenter',
                            })
                        }
                    })
                }
            });
        }
    }
})