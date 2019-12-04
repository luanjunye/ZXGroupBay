// pages/userCenter/groupOrder/groupOrder.js
import Dialog from './../../../lib/vant-weapp/dialog/dialog';

const util = require('../../../utils/util');
const api = require('../../../config/url.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        groupId: "",
        from: "",
        isShow: 0,
        isLogin: false,
        userId: "",
        pageNo: 1,// 分页相关
        perPageCount: 15, // 每次请求的数量条数
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

    /**
     * 生命周期函数--监听页面加载
     */
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
        this.setData({
            groupList: [],
            pageNo: 1,// 分页相关
            hasMore: true, // 标记是否还有更多
            key: ""
        });
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
        this.onShow()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let currentPageNo = this.data.pageNo + 1;
        if (this.data.hasMore) {
            if (this.data.key) {
                this.HistoryGroupInfo(this.data.userId, currentPageNo, this.data.groupId, this.data.type, this.data.key);
            } else {
                this.HistoryGroupInfo(this.data.userId, currentPageNo, this.data.groupId, "", this.data.key);
            }
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

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
        Dialog.confirm({
            message: '是否确认收货？'
        }).then(() => {
            // on confirm
            let userId = this.data.userId

            util.request(api.OrderConfirm, {
                userId: userId,
            }, "POST").then(function (res) {
               wx.showToast({
                 title:'确认收货成功',
               })
            });

        }).catch(() => {
            // on cancel
        });

    }
})