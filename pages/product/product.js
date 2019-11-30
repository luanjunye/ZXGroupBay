// pages/product/product.js
import Toast from '../../lib/vant-weapp/toast/toast';

const api = require('../../config/url.js');
const util = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: "",
        activity1: "满即送：满30元送泽轩基金奶茶一杯；",
        activity2: "满立减：满60元立减10元；",
        isLogin: false,
        userId: "",
        cartList: [],
        product:
            {
                banner: [
                    {
                        id: 1,
                        url: "https://zexuanshipin.oss-cn-beijing.aliyuncs.com/20191108/5e53561ab3f54195b9d2000f6cad6f89.jpg"
                    },
                    {
                        id: 2,
                        url: "https://zexuanshipin.oss-cn-beijing.aliyuncs.com/20191108/b2ccee96aaef47f8916283c7e206363c.jpg"
                    },
                    {
                        id: 3,
                        url: "https://zexuanshipin.oss-cn-beijing.aliyuncs.com/20191108/31916f2423ba4e4ea852036dc80a23ca.jpg"
                    },
                    {
                        id: 4,
                        url: "https://zexuanshipin.oss-cn-beijing.aliyuncs.com/20191108/4bb036ab95f340978b2736014cfc254a.jpg"
                    },
                    {
                        id: 5,
                        url: "https://zexuanshipin.oss-cn-beijing.aliyuncs.com/20191108/7376c6e1b3f749388cc012f62449b316.jpg"
                    }
                ],
                price: 9.9,
                originalPrice: 19.9,
                remain: 237,
                groupBay: 7268,
                targetTime: 10000,
                title: "紫米面包6袋，110g/袋",
                description: "奶油，紫米，层层相扣，绝妙口感，特别好吃",
                place: "新疆",
                num: "1袋",
                specification: "110g",

                goodsDetailsList: [
                    {
                        goodsId: 32,
                        url: "https://zexuanshipin.oss-cn-beijing.aliyuncs.com/20191108/b88e0afac9814fe8bd479623a7aab391.jpg"
                    },
                    {
                        goodsId: 32,
                        url: "https://zexuanshipin.oss-cn-beijing.aliyuncs.com/20191108/fc050e0ef27a4214ab0ee9628fec0b39.jpg"
                    },
                    {
                        goodsId: 32,
                        url: "https://zexuanshipin.oss-cn-beijing.aliyuncs.com/20191108/e6f9db285b4e428b9cd9e0e952c25963.jpg"
                    },
                    {
                        goodsId: 32,
                        url: "https://zexuanshipin.oss-cn-beijing.aliyuncs.com/20191108/0cd98ca8d6914a8f8fde6c2b33068e12.jpg"
                    },
                    {
                        goodsId: 32,
                        url: "https://zexuanshipin.oss-cn-beijing.aliyuncs.com/20191108/34c198bcf3254138b3eb09095eb0ef60.jpg"
                    },
                    {
                        goodsId: 32,
                        url: "https://zexuanshipin.oss-cn-beijing.aliyuncs.com/20191108/7fe48e431d694166a2647d5a0706a855.jpg"
                    },
                    {
                        goodsId: 32,
                        url: "https://zexuanshipin.oss-cn-beijing.aliyuncs.com/20191108/c087d94c4f2242ebaeb966ed48dbab87.jpg"
                    }
                ],
            }
        ,
        likeList: [
            {
                id: 1,
                url: "/assets/list1.jpg",
                title: "农家种无公害辣椒新鲜5斤应季蔬菜",
                description: "蓝海专供",
                label: "次日达",
                price: "9.9",
                originalPrice: "19.9",
                group: "556",
                remaining: "236",
                sale: "5112"
            },
            {
                id: 2,
                url: "/assets/list1.jpg",
                title: "农家种无公害辣椒新鲜5斤应季蔬菜",
                description: "蓝海专供",
                label: "次日达",
                price: "9.9",
                originalPrice: "19.9",
                group: "556",
                remaining: "236",
                sale: "5112"
            },
            {
                id: 3,
                url: "/assets/list1.jpg",
                title: "农家种无公害辣椒新鲜5斤应季蔬菜",
                description: "蓝海专供",
                label: "次日达",
                price: "9.9",
                originalPrice: "19.9",
                group: "556",
                remaining: "236",
                sale: "5112"
            },
            {
                id: 4,
                url: "/assets/list1.jpg",
                title: "农家种无公害辣椒新鲜5斤应季蔬菜",
                description: "蓝海专供",
                label: "次日达",
                price: "9.9",
                originalPrice: "19.9",
                group: "556",
                remaining: "236",
                sale: "5112"
            },
            {
                id: 5,
                url: "/assets/list1.jpg",
                title: "农家种无公害辣椒新鲜5斤应季蔬菜",
                description: "蓝海专供",
                label: "次日达",
                price: "9.9",
                originalPrice: "19.9",
                group: "556",
                remaining: "236",
                sale: "5112"
            },
            {
                id: 6,
                url: "/assets/list1.jpg",
                title: "农家种无公害辣椒新鲜5斤应季蔬菜",
                description: "蓝海专供",
                label: "次日达",
                price: "9.9",
                originalPrice: "19.9",
                group: "556",
                remaining: "236",
                sale: "5112"
            }
        ],
        down_avater: [
            {
                id: 1,
                url: "/assets/avater.png"
            },
            {
                id: 2,
                url: "/assets/avater.png"
            },
            {
                id: 3,
                url: "/assets/avater.png"
            }
        ]

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this
        wx.setNavigationBarTitle({
            title: '商品详情',
        })
        let id = options.id
        if (id) {
            this.setData({
                id: id
            })
        }

        util.request(api.GoodsInfo, {
            id: this.data.id
        }, "POST").then(function (res) {
            that.setData({
                product: res
            })
            console.log(that.data.product)
        });
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
        let isLogin = wx.getStorageSync('isLogin')
        let userId = wx.getStorageSync('userId')
        console.log(userId)
        if (isLogin && userId) {
            this.setData({
                isLogin: isLogin,
                userId: userId
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
                label: "次日达",
                checked: true,
                picUrl: this.data.product.goodsViewList[0].url,
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
                    //that.selectCart()

            });
            wx.setStorageSync("cartList", cartList)
            this.setData({
                cartList: cartList
            });

            Toast("加入购物车成功")
        }

    },
    toBuy: function () {
        if (this.checkLogin()) {
            // 跳转checkout页面
            wx.setStorageSync("checkoutProduct", this.data.product);
            wx.setStorageSync("count", 1);
            wx.navigateTo({
                url: '/pages/order/confirmOrder/confirmOrder?from=product',
            })
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
        // util.request(api.ProductInCart, {
        //     userId: this.data.userId,
        // }, "POST").then(function(res) {
        //     if (res.code === 0) {
        //         data.count = res.count
        //         that.setData(data)
        //     }
        // });
    }
})