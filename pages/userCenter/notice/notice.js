// pages/userCenter/notice/notice.js
const util = require('../../../utils/util');
const api = require('../../../config/url.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notice_list:[],
    isLogin: false,
    userId: "",
    pageNo: 1,// 分页相关
    perPageCount: 30, // 每次请求的数量条数
    hasMore: true, // 标记是否还有更多

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userId = wx.getStorageSync("userId")
    let isLogin = wx.getStorageSync("isLogin");
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
      notice_list: [],
      pageNo: 1,// 分页相关
      hasMore: true, // 标记是否还有更多
    });
      this.getNotice(this.data.userId,this.data.pageNo)

    util.request(api.IsRead, {
      userId: this.data.userId,
    }, "POST").then(function (res) {
        
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
    this.onShow()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let currentPageNo = this.data.pageNo + 1;
    if (this.data.hasMore) {
      this.getNotice(this.data.userId, currentPageNo);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //展示通知
  getNotice(userId, pageNo) {
    var that = this
    this.setData({
      loading: true
    });
    //首页商品列表
    util.request(api.GetNotice, {
      page: pageNo,
      userId: userId,
      limit: that.data.perPageCount
    }, "GET").then(function (res) {
      let currentGoodsArray = that.data.notice_list.concat(res.list);
      if (currentGoodsArray.length === res.totalCount) { // 如果当前返回页面跟总页面数相同，说明没有更多内容了
        that.setData({
          hasMore: false
        })
      }
      that.setData({
        notice_list: currentGoodsArray,
        loading: false
      });
    });
  },
})