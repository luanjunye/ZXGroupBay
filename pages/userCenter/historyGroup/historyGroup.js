// pages/userCenter/historyGroup/historyGroup.js
const util = require('../../../utils/util');
const api = require('../../../config/url.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isLogin: false,
        userId: "",
        pageNo: 1,// 分页相关
        perPageCount: 30, // 每次请求的数量条数
        hasMore: true, // 标记是否还有更多
        historyGroupList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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
        this.setData({
            historyGroupList: [],
            pageNo: 1,// 分页相关
            hasMore: true, // 标记是否还有更多
        });
        //获取历史开团列表
        this.HistoryGroupList(this.data.userId, this.data.pageNo)
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
        let that = this
        let currentPageNo = this.data.pageNo + 1;
        if (this.data.hasMore) {
            that.setData({
                pageNo : currentPageNo
            })
            this.HistoryGroupList(this.data.userId, currentPageNo);
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    //展示商品
    HistoryGroupList(userId, pageNo) {
        var that = this
        this.setData({
            loading: true
        });
        //首页商品列表
        util.request(api.HistoryGroup, {
            page: pageNo,
            userId: userId,
            limit: that.data.perPageCount
        }, "GET").then(function (res) {
            let timeStamp = util.getTimeStamp()

            let currentGoodsArray = that.data.historyGroupList.concat(res.list);
            if (currentGoodsArray.length === res.totalCount) { // 如果当前返回页面跟总页面数相同，说明没有更多内容了
                that.setData({
                    hasMore: false
                })
            }

            that.setData({
                historyGroupList: currentGoodsArray,
                loading: false,
            });

            for (let i = 0; i < that.data.historyGroupList.length; i++) {
                let difference = that.data.historyGroupList[i].endTime - timeStamp
                that.setData({
                    [`historyGroupList[${i}].difference`] : difference
                })
            }
        });
    },

    toInfo:function (e) {
        let data = e.currentTarget.dataset.value;
        if (data.tuanTeamId) {
            wx.navigateTo({
                url: '/pages/userCenter/groupOrder/groupOrder?from=historyGroup&&groupId=' + data.tuanTeamId,
            })
        }
    }

})