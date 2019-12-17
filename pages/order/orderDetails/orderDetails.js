// pages/order/orderDetails/orderDetails.js
import Toast from '../../../lib/vant-weapp/toast/toast';

const api = require('../../../config/url.js');
const util = require('../../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderId: "",
        product: {},
        failPayTime: 0,
        isPay:false
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

    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let that = this
        that.setData({
            isPay : false
        })
        //获取订单详情
        util.request(api.OrderInfo, {id: this.data.orderId}, "POST").then(function (res) {
            let timeStamp = util.getTimeStamp()
            let failPayTime = res.failPayTime - timeStamp
            that.setData({
                product: res,
                failPayTime: failPayTime
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
    toPay: function () {
        let orderId = this.data.orderId
        let that = this
        console.log(this.data.isPay)
        if(this.data.isPay){
            return
        }
        if (orderId) {
            that.setData({
                isPay : true
            })
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
    },

    //退款
    toRefund: function () {
        let that = this
        wx.showModal({
            title: '是否确认退款?',
            success (res) {
                if (res.confirm) {
                    util.request(api.OrderRefund, {id: that.data.orderId}, "POST").then(function (res) {
                        console.log(res)
                        Toast('退款成功')
                        that.setData({
                            product: {}
                        })
                        that.onShow()
                    });
                } else if (res.cancel) {

                }
            }
        })
    },

    //退换货协议
    toAgreement: function () {
        wx.navigateTo({
            url: '/pages/userCenter/annouceRefund/annouceRefund',
        })
    },
})