// pages/order/confirmOrder/confirmOrder.js
const util = require('../../../utils/util');
const api = require('../../../config/url.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        ConfirmOrder: {},
        name: "",
        mobile: "",
        remark: "",
        userId: "",
        isLogin: false,
        list: [],
        type:0,
        isPay:false
    },


    // input 值绑定
    handleInputChange: function (e) {
        let name = e.currentTarget.dataset.model; // 取出定义的变量名
        let value = e.detail.value; // 取出实时的变量值
        let dataMap = {}; // 定义一个键值对
        dataMap[name] = value; // 设置这个键值对的键和值
        this.setData(dataMap); // 刷新数据
        // 这里用于测试
        console.log(name, ':', this.data[name]) // 显示 page 内 data 的实际数据
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '确认订单',
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
        let ConfirmOrder = wx.getStorageSync("ConfirmOrder")
        let list = []
        if (ConfirmOrder) {
            for (let i = 0; i < ConfirmOrder.orderInfoGoodsListVOList.length; i++) {
                list.push({
                    "goodsId": ConfirmOrder.orderInfoGoodsListVOList[i].id,
                    "num": ConfirmOrder.orderInfoGoodsListVOList[i].num
                })
            }
            this.setData({
                ConfirmOrder : ConfirmOrder,
                list : list,
                type : 1,
                 isPay : false
            })
        }
        let isLogin = wx.getStorageSync('isLogin')
        let userId = wx.getStorageSync('userId')
        if (isLogin && userId) {
            this.setData({
                isLogin: isLogin,
                userId: userId
            })
        }
    },

    toPay: function () {
        let that = this
        if(this.data.isPay){
            return
        }

        if (this.data.name.length < 1) {
            util.toast('请输入名字')
        } else if (!(util.REGEX.mobile.test(this.data.mobile))) {
            util.toast('请输入正确的手机号')
        }else {
            that.setData({
                isPay : true
            })
            util.request(api.OrderSave, {
                fullOutPrice: this.data.ConfirmOrder.fullOutPrice,
                goodsPrice: this.data.ConfirmOrder.goodsPrice,
                mobile: this.data.mobile,
                name: this.data.name,
                type: this.data.type,
                orderBuyInfoGoodsListVOS: this.data.list,
                orderPrice: this.data.ConfirmOrder.orderPrice,
                postscript: this.data.remark,
                userId: this.data.userId,
            }, "POST").then(function (res) {
                console.log(res)
                wx.setStorageSync("ConfirmOrder","")
                that.setData({
                    type : 0
                })
                let orderId = res
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
            })
        }
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

    //退换货协议
    toAgreement: function () {
        wx.navigateTo({
            url: '/pages/userCenter/annouceRefund/annouceRefund',
        })
    },

})