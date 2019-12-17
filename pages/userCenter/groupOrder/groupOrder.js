// pages/userCenter/groupOrder/groupOrder.js

const util = require('../../../utils/util');
const api = require('../../../config/url.js');

Page({

    data: {

        canApplyFeedback: true,  // 是否能申请售后

        groupId: "",
        from: "",
        isShow: 0,
        isLogin: false,
        userId: "",
        pageNo: 1,// 分页相关
        perPageCount: 30, // 每次请求的数量条数
        hasMore: true, // 标记是否还有更多
        option1: [
            {text: '手机', value: 1},
            {text: '昵称', value: 2},
            {text: '姓名', value: 3}
        ],
        status: 1,
        groupList: [],
        key: "",
        type: 1,
    },



    onLoad: function (options) {
        let from = options.from
        console.log(from)
        if (from) {
            if (from == "mine") {
                this.setData({
                    from: "mine",
                })
            } else {
                let groupId = options.groupId
                if (groupId) {
                    this.setData({
                        groupId: groupId,
                        from: "historyGroup"
                    })
                }
            }
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


    // 申请退款
    feedback(e) {
        // 在跳转到申请页面之前，保存当前订单的一些信息
        let currentProduct = e.currentTarget.dataset.value;
        let orderNo = e.currentTarget.dataset.ordernum;
        let buyer = e.currentTarget.dataset.buyer;

        let infoFeedback = {
            product: currentProduct,
            buyer: buyer,
            orderNum: orderNo,
        };

        console.log(infoFeedback);
        wx.setStorageSync('infoFeedback', infoFeedback);
        wx.navigateTo({
            url: '/pages/userCenter/feedbackApply/feedbackApply'
        })
    },

    onReady: function () {},
    onShow: function () {
        let that = this

        console.log(this.data.userId)
        util.request(api.OrderSubmit, {
            userId: this.data.userId,
        }, "POST").then(function (res) {
            that.setData({
                isShow: res
            })
        });
        this.HistoryGroupInfo(this.data.userId, this.data.pageNo, this.data.groupId, "", this.data.key)

    },

    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {
        this.setData({
            groupList: [],
            pageNo: 1,// 分页相关
            hasMore: true, // 标记是否还有更多
            key: "",
            isShow: 0
        });
        this.onShow()
    },
    hBottom: function () {
        let currentPageNo = this.data.pageNo + 1;
        if (this.data.hasMore) {
            if (this.data.key) {
                this.HistoryGroupInfo(this.data.userId, currentPageNo, this.data.groupId, this.data.type, this.data.key);
            } else {
                this.HistoryGroupInfo(this.data.userId, currentPageNo, this.data.groupId, "", this.data.key);
            }
        }
    },

    onShareAppMessage: function () {},

    //团购列表详情
    HistoryGroupInfo(userId, pageNo, grpuoId, type, key) {
        var that = this
        this.setData({
            loading: true
        });
        //团购列表详情
        util.request(api.GroupInfo, {
            page: pageNo,
            userId: userId,
            teamId: grpuoId,
            type: type,
            name: key,
            limit: that.data.perPageCount
        }, "GET").then(function (res) {
            let timeStamp = util.getTimeStamp()

            let currentGoodsArray = that.data.groupList.concat(res.list);
            if (currentGoodsArray.length === res.totalCount) { // 如果当前返回页面跟总页面数相同，说明没有更多内容了
                that.setData({
                    hasMore: false
                })
            }

            that.setData({
                groupList: currentGoodsArray,
                loading: false,
            });

        });
    },

    //搜索页输入
    input: function (e) {
        let key = util.trim(e.detail.value);
        console.log(key)
        this.setData({
            key: key
        })
    },

    //清空搜索框
    cleanKey: function () {
        this.setData({
            key: ''
        });
    },

    //设定下拉列表type值
    onChange({detail}) {
        console.log(detail)
        this.setData({
            type: detail
        })
    },

    //搜索
    submit: function () {
        let key = this.data.key
        this.setData({
            groupList: []
        })

        if (key) {
            this.HistoryGroupInfo(this.data.userId, this.data.pageNo, this.data.groupId, this.data.type, key)
        } else {
            this.HistoryGroupInfo(this.data.userId, this.data.pageNo, this.data.groupId, "", key)
        }
    },

    //确认收货
    submitOrder: function () {
        let that = this;

        wx.showModal({
            title: '是否确认收货',
            success (res) {
                if (res.confirm) {
                    let userId = that.data.userId
                    util.request(api.OrderConfirm, {
                        userId: userId,
                    }, "POST").then(function (res) {
                        wx.showToast({
                            title: '确认收货成功',
                        })
                        that.setData({
                            isShow: 0
                        })
                    });
                } else if (res.cancel) {
                    
                }
            }
        })
    }
})