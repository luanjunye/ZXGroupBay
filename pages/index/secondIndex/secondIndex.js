// pages/index/secondIndex/secondIndex.js
import Toast from "../../../lib/vant-weapp/toast/toast";

const api = require('../../../config/url.js');
const util = require('../../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        typeId: "",
        pageNo: 1,// 分页相关
        perPageCount: 30, // 每次请求的数量条数
        hasMore: true, // 标记是否还有更多
        orderList: [],
        userId: "",
        isLogin: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var id = options.id
        this.setData({
            typeId: id
        })
        var userId = wx.getStorageSync("userId")
        let isLogin = wx.getStorageSync("isLogin");
        if (isLogin && userId) {
            this.setData({
                isLogin: isLogin,
                userId: userId
            })
        }
        this.setData({
            orderList: [],
            pageNo: 1,// 分页相关
            hasMore: true, // 标记是否还有更多
        });
        this.changeOrderList(this.data.typeId, this.data.pageNo)

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
            orderList: [],
            pageNo: 1,// 分页相关
            hasMore: true, // 标记是否还有更多
        });
        this.changeOrderList(this.data.typeId, this.data.pageNo)
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let currentPageNo = this.data.pageNo + 1;
        if (this.data.hasMore) {
            this.changeOrderList(this.data.typeId, currentPageNo);
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    //展示商品
    changeOrderList(categoryId, pageNo) {
        var that = this
        //首页商品列表
        util.request(api.GoodsList, {
            page: pageNo,
            categoryId: categoryId,
            limit: that.data.perPageCount
        }, "GET").then(function (res) {
            let currentGoodsArray = that.data.orderList.concat(res.list);
            if (currentGoodsArray.length === res.totalCount) { // 如果当前返回页面跟总页面数相同，说明没有更多内容了
                that.setData({
                    hasMore: false
                })
            }
            that.setData({
                orderList: currentGoodsArray,
                page: pageNo
            });
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

    //添加到购物车
    addCart: function (e) {
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

    checkLogin: function () {
        if (!this.data.isLogin) {
            wx.navigateTo({
                url: '/pages/login/login',
            })
        } else {
            return true
        }
    },
})