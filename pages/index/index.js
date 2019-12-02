//index.js
import Toast from '../../lib/vant-weapp/toast/toast';
//获取应用实例
const api = require('../../config/url.js');
const util = require('../../utils/util.js');
const app = getApp()
//主页面
Page({
    data: {
        banner: [],
        classification: [],
        groupInfo: [],
        shippingStatus: 0,   //shippingStatus 1 热卖   2 爆款    3 秒杀 4  团长推荐
        orderList: [],
        isLogin: false,
        userId: "",
        pageNo: 1,// 分页相关
        perPageCount: 15, // 每次请求的数量条数
        hasMore: true, // 标记是否还有更多
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
        ],
        targetTime: 0,
        clearTimer: false,
        loading: false,
        buyerList: [],
        regimental: {
            address: "",
            nickname: "",
            avatar: ""
        },
    },
    onload() {
        // this.setData({
        //     targetTime: new Date().getTime() + 6430000
        // });

        getApp().globalData.type = 0;
    },

    countDown(e) {
        Toast("团购已结束")
    },

    // ========================
    onReady: function () {
    },
    onShow: function () {
        let that = this;
        var userId = wx.getStorageSync("userId")
        let isLogin = wx.getStorageSync("isLogin");
        if (isLogin && userId) {
            this.setData({
                isLogin: isLogin,
                userId: userId
            })
        }

        this.setData({
            shippingStatus: 0,
            orderList: [],
            pageNo: 1,// 分页相关
            hasMore: true, // 标记是否还有更多
        });

        //首页购买信息
        util.request(api.IndexRoll, {}, "POST").then(function (res) {
            that.setData({
                buyerList: res
            });
        });

        //首页团长信息
        util.request(api.IndexRegimental, {userId: userId}, "POST").then(function (res) {
            that.setData({
                ["regimental.address"]: res.address,
                ["regimental.nickname"]: res.nickname,
                ["regimental.avatar"]: res.avatar,
            });
        });

        //首页banner
        util.request(api.IndexUrlBanner, {}, "GET").then(function (res) {
            that.setData({
                banner: res
            });
        });

        //首页截团倒计时
        util.request(api.IndexEndTime, {}, "POST").then(function (res) {

            var timeStamp = util.getTimeStamp()
            var difference = res - timeStamp
            that.setData({
                targetTime: difference
            })

        });


        //首页拼团信息
        util.request(api.IndexCopyGroup, {userId: userId}, "POST").then(function (res) {
            that.setData({
                groupInfo: res
            });
        });

        //首页分类Icon
        util.request(api.IndexClassification, {}, "GET").then(function (res) {
            that.setData({
                classification: res
            });
        });

        //首页商品列表
        this.changeOrderList(0, 1)

    },
    onHide: function () {
    },
    onUnload: function () {
    },
    onPullDownRefresh: function () {
        this.onShow()
    },
    onReachBottom: function () {
        let currentPageNo = this.data.pageNo + 1;
        if (this.data.hasMore) {
            this.changeOrderList(this.data.shippingStatus, currentPageNo);
        }
    },
    onShareAppMessage: function () {
    },
    changeCommander: function () {
        wx.navigateTo({
            url: '/pages/regimentalCommander/changeCommander'
        })
    },
    copyAnnouncement: function () {
        var that = this;
        var content = "";

        that.data.groupInfo.content.forEach(item => {
            let itema = `${item}\n`
            content += itema
        })
        wx.setClipboardData({
            data: "团购名称:" + that.data.groupInfo.name + "\n" + "团购介绍：" + (that.data.groupInfo.info = null ? that.data.groupInfo.info : "暂无") + "\n" + "截团时间:" + that.data.groupInfo.time + "\n" + "\n" + "今日特惠：\n" + content,
            success: function (res) {
                wx.showToast({
                    title: '复制成功',
                })
            }
        })

    },

    //切换标签
    changeTab(e) {
        let shippingStatus = e.detail.index;
        getApp().globalData.type = shippingStatus;
        this.setData({
            shippingStatus: shippingStatus,
            orderList: [],
            pageNo: 1,// 分页相关
            hasMore: true, // 标记是否还有更多
        });
        this.changeOrderList(shippingStatus, 1)
    },

    //展示商品
    changeOrderList(shippingStatus, pageNo) {
        var that = this
        this.setData({
            loading: true
        });
        //首页商品列表
        util.request(api.GoodsList, {
            page: pageNo,
            type: shippingStatus + 1,
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
                loading: false
            });
        });
    },

    //去商品详情页
    toOrder: function (e) {
        let data = e.currentTarget.dataset.value;
        if (data.id) {
            wx.navigateTo({
                url: '/pages/product/product?id=' + data.id,
            })
        }
    },

    //去二级分类页
    toSecond: function (e) {
        let data = e.currentTarget.dataset.value;
        if (data.id) {
            wx.navigateTo({
                url: "/pages/index/secondIndex/secondIndex?id=" + data.id,
            })
        }
    },

    //添加到购物车
    addCart: function (e) {
        let that = this
        var data = e.currentTarget.dataset.value;
        if (data.id) {
            util.request(api.CartAdd, {
                goodsId: data.id,
                userId: this.data.userId,
            }, "POST").then(function (res) {
                //that.selectCart()
                Toast("加入购物车成功")
            });
        }

    }

});
