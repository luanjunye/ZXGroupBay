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
        shippingStatus: 0, //shippingStatus 1 热卖   2 爆款    3 秒杀 4  团长推荐
        orderList: [],
        isShow: false,
        isLogin: false,
        isOverlay: false,
        userId: "",
        pageNo: 1, // 分页相关
        perPageCount: 30, // 每次请求的数量条数
        hasMore: true, // 标记是否还有更多
        targetTime: 0,
        clearTimer: false,
        buyerList: [],
        regimental: {
            address: "",
            nickname: "",
            avatar: ""
        },
        newGift:{},
        sold:0
    },
    onLoad(options) {
        let that = this;
        var sold = 0;
        var userId = wx.getStorageSync("userId")
        let isLogin = wx.getStorageSync("isLogin");
        if (isLogin && userId) {
            util.updateCartCount(); // 刷新购物车数量
            //首页团长信息
            util.request(api.IndexRegimental, {
                userId: userId
            }, "POST").then(function (res) {
                that.setData({
                    ["regimental.address"]: res.address,
                    ["regimental.nickname"]: res.nickname,
                    ["regimental.avatar"]: res.avatar,
                });
            });
            this.setData({
                isLogin: isLogin,
                userId: userId
            })
        }
        this.setData({
            shippingStatus: 0,
            orderList: [],
            pageNo: 1, // 分页相关
            hasMore: true, // 标记是否还有更多
        });

        //首页购买信息
        util.request(api.IndexRoll, {}, "POST").then(function (res) {
            that.setData({
                buyerList: res
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

        //查询新人礼
        util.request(api.NewGift, {}, "GET").then(function (res) {
            let total = res.leftCount + res.sellCount
            sold =  res.sellCount / total * 100
            that.setData({
                newGift : res,
                sold : Number(sold.toFixed(2))
            })
        });


        //首页拼团信息
        util.request(api.IndexCopyGroup, {
            userId: userId
        }, "POST").then(function (res) {
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

    countDown(e) {
        Toast("团购已结束")
        this.setData({
            shippingStatus: 0,
            orderList: [],
            pageNo: 1, // 分页相关
            hasMore: true, // 标记是否还有更多
        });
    },

    // ========================
    onReady: function () {
    },
    onShow: function () {


    },
    onHide: function () {
    },
    onUnload: function () {
    },
    onPullDownRefresh: function () {
        this.onLoad()
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
        if (this.data.userId) {
            wx.navigateTo({
                url: '/pages/regimentalCommander/changeCommander'
            })
        } else {
            wx.navigateTo({
                url: '/pages/login/login'
            })
        }


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
            pageNo: 1, // 分页相关
            hasMore: true, // 标记是否还有更多
        });
        this.changeOrderList(shippingStatus, 1)
    },

    //展示商品
    changeOrderList(shippingStatus, pageNo) {
        var that = this

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
                pageNo : pageNo
            });
        });
    },

    //banner点击跳转
    handleClick: function (e) {
        let data = e.currentTarget.dataset.value;
        if (data.webUrl) {
            if (this.data.targetTime > 0) {
                wx.navigateTo({
                    url: data.webUrl
                })
            } else {
                Toast("商品采购中，敬请期待！")
            }
        }
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
            if (this.data.targetTime > 0) {
                wx.navigateTo({
                    url: "/pages/index/secondIndex/secondIndex?id=" + data.id,
                })
            } else {
                Toast("商品采购中，敬请期待！")
            }
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

    //前往搜索页面
    toSearch: function () {
        wx.navigateTo({
            url: "/pages/search/search"
        })
    },

    //点击分享
    openService: function () {
        this.setData({
            isShow: true
        })
    },

    //关闭分享
    closeService: function () {
        this.setData({
            isShow: false
        })
    },

    //点击分享取消按钮
    cancel: function () {
        this.setData({
            isShow: false
        })
    },

    //生成海报
    poster: function () {
        wx.navigateTo({
            url: '/pages/userCenter/poster/poster'
        })
    },

});