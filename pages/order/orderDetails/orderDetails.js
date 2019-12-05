// pages/order/orderDetails/orderDetails.js
import Dialog from './../../../lib/vant-weapp/dialog/dialog';
import Toast from '../../../lib/vant-weapp/toast/toast';

const api = require('../../../config/url.js');
const util = require('../../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isMaster: false,  // 是否是团长
        orderId: "",
        product: {},
        failPayTime: 0
    },

    // 申请退款
    feedback(e) {
        // 在跳转到申请页面之前，保存当前订单的一些信息
        let currentProduct = e.currentTarget.dataset.value;
        let infoFeedback = {
            product: currentProduct,
            buyer: this.data.product.consignee,
            orderNum: this.data.product.orderNum,
        };
        wx.setStorageSync('infoFeedback', infoFeedback);
        wx.navigateTo({
            url: '/pages/userCenter/feedbackApply/feedbackApply'
        })
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

        // 更新是否是团长的标识
        this.setData({
            isMaster: util.getUserInfo().isMaster
        })
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
        if (orderId) {
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
        Dialog.confirm({
            message: '是否确认退款？'
        }).then(() => {
            //获取订单详情
            util.request(api.OrderRefund, {id: this.data.orderId}, "POST").then(function (res) {
                console.log(res)
                Toast('退款成功')
                that.setData({
                    product: {}
                })
                that.onShow()
            });

        }).catch(() => {
            // on cancel
        });
    }
})