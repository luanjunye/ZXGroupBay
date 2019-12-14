// pages/product/product.js
import Toast from '../../lib/vant-weapp/toast/toast';

const api = require('../../config/url.js');
const util = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // autoplay: true,
        id: "",
        activity: "",
        isLogin: false,
        userId: "",
        cartList: [],
        difference: 0,
        product: {},
        likeList: [],
        count: 0,
        ConfirmOrder: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '商品详情',
        })
        let id = options.id
        if (id) {
            this.setData({
                id: id
            })
        }
    },

/*
    // 轮播自动滚动停止
    stopAutoSwiper() {
        this.setData({
            autoplay: false
        })
    },

    // 轮播自动滚动开始
    startAutoSwiper() {
        this.setData({
            autoplay: true
        })
    },
*/


    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let that = this
        let isLogin = wx.getStorageSync('isLogin')
        let userId = wx.getStorageSync('userId')
        if (isLogin && userId) {
            this.setData({
                isLogin: isLogin,
                userId: userId
            })
        }
        util.request(api.GoodsInfo, {
            id: this.data.id
        }, "POST").then(function (res) {
            var timeStamp = util.getTimeStamp()
            var difference = res.endTime - timeStamp
            that.setData({
                product: res,
                difference: difference
            })

        });

        util.request(api.GoodsList, {
            page: 1,
            isLike: 1
        }, "GET").then(function (res) {
            that.setData({
                likeList: res.list
            })
        });

        util.request(api.ActivityDiscount, {}, "GET").then(function (res) {
            that.setData({
                activity: res.replace('\r\n', "")
            })
        });
        this.selectCart()
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
        this.setData({
            product: {},
            likeList: []
        })
        this.onShow()
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
        let product = this.data.product;
        let productInfo = `${product.name}\n￥${product.price}`
        return {
            title: productInfo,
            // path: '/pages/userCenter/mine/mine?master=123456',
            imageUrl: this.data.product.goodsViewList[0]
        }
    },
    toIndex: function () {
        wx.switchTab({
            url: '/pages/index/index',
        })
    },
    toShopCart: function () {
        wx.switchTab({
            url: '/pages/shopCart/shopCart',
        })

    },
    addCart: function () {
        let that = this
        if (this.checkLogin()) {
            let cartList = this.data.cartList;
            cartList.push({
                id: this.data.product.id,
                label: "截团后次日达",
                checked: true,
                picUrl: this.data.product.goodsViewList[0],
                title: this.data.product.name,
                spec: this.data.product.info,
                originPrice: this.data.product.originalPrice,
                count: 1,
                maxNum: 99,
                price: this.data.product.price
            });
            util.request(api.CartAdd, {
                goodsId: this.data.id,
                userId: this.data.userId,
            }, "POST").then(function (res) {
                console.log(res)
                that.selectCart()

            });
            wx.setStorageSync("cartList", cartList)
            this.setData({
                cartList: cartList
            });

            Toast("加入购物车成功")
        }

    },

    //添加到购物车
    likeAddCart: function (e) {
        if (this.checkLogin()) {
            let that = this
            var data = e.currentTarget.dataset.value;
            if (data.id) {
                util.request(api.CartAdd, {
                    goodsId: data.id,
                    userId: this.data.userId,
                }, "POST").then(function (res) {
                    //that.selectCart()
                    util.updateCartCount()
                    Toast("加入购物车成功")
                });
            }
        }
    },

    toBuy: function () {
        if (this.checkLogin()) {
            // 跳转checkout页面
            // wx.setStorageSync("checkoutProduct", this.data.product);
            // wx.setStorageSync("count", 1);
            let that = this
            util.request(api.buyInfo, {
                goodsId: this.data.product.id,
                userId: this.data.userId,
                num: 1
            }, "POST").then(function (res) {
                //that.selectCart()
                that.setData({
                    ConfirmOrder: res
                })
                wx.setStorageSync("ConfirmOrder", that.data.ConfirmOrder)
                wx.navigateTo({
                    url: '/pages/order/confirmOrder/confirmOrder',
                })
            });

        }
    },
    checkLogin: function () {
        if (!this.data.isLogin) {
            wx.navigateTo({
                url: '/pages/login/login',
            })
        } else {
            return true
        }
    },
    selectCart: function () {
        let that = this
        var data = new Object();
        util.request(api.ProductInCart, {
            userId: this.data.userId,
        }, "POST").then(function (res) {
            data.count = res
            that.setData(data)
        });
    },
    toOrder: function (e) {
        let data = e.currentTarget.dataset.value;
        if (data.id) {
            wx.navigateTo({
                url: '/pages/product/product?id=' + data.id,
            })
        }
    },

    countDown: function () {
        Toast("团购已结束")
        this.setData({
            product: {},
            likeList: [],
            difference: 0,
        })
    }
})