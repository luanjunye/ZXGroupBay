const api = require('../../../config/url.js');
const util = require('../../../utils/util.js');

Page({
  data: {
    // navbar
    navbarTabs: [
      { id:0, title: '全部', active: true},
      { id:1, title: '待审核', active: false},
      { id:2, title: '处理中', active: false},
      { id:3, title: '已完成', active: false},
    ],

    feedbackList: [
/*      id: 4
        state: 2
        time: "2019-11-29 17:05:49"
        title: "烟台苹果 5个约2斤申请售后"*/
    ],

    currentStateId: 0,

    // 分页相关
    pageNo: 1,
    perPageCount: 30, // 每次请求的数量条数
    hasMore: true, // 标记是否还有更多

  },

  onLoad: function (options) {
    this.switchState(0);
  },

  // 查看工单详情
  toTicketDetail(e){
    let ticketNo = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/userCenter/feedbackDetail/feedbackDetail?ticketno=' + ticketNo
    })
  },

  // 订单状态点击
  navbarTaped(e){
    let index = e.currentTarget.dataset.index;
    this.switchState(index);
  },


// 订单状态切换
  switchState(index){
    let tempArray = [];
    this.data.navbarTabs.forEach(item=>{
      tempArray.push({
        id: item.id,
        title: item.title,
        active: index === item.id
      })
    })
    this.setData({
      currentStateID: index,
      navbarTabs: tempArray,
      feedbackList: [],
      currentStateId: index,
      pageNo: 1,
      perPageCount: this.data.perPageCount,
      hasMore: true,
    })

    // 加载对应状态的订单数据
    this.getFeedbackList(index, this.data.pageNo)

  },

  // 加载订单数据
  getFeedbackList(currentStateId, pageNo){
    let that = this;
    util.request(api.FeedbackList, {
      userId: util.getUserInfo().userId,
      status: currentStateId,
      page: pageNo,
      limit: that.data.perPageCount
    }, 'GET').then(res => {
      let tempOrderArray = that.data.feedbackList.concat(res.list);
      if (tempOrderArray.length === res.totalCount){ // 如果当前返回页面跟总页面数相同，说明没有更多内容了
        that.setData({
          hasMore: false
        })
      }
      that.setData({
        pageNo: pageNo,
        feedbackList: tempOrderArray
      })
    })
  },



// ========================
  onPullDownRefresh: function () {
    this.setData({
      feedbackList: [],
      pageNo: 1,
      perPageCount: this.data.perPageCount,
      hasMore: true,
    })
    this.switchState(this.data.currentStateId);
  },

  // 加载分页数据
  onReachBottom: function () {
    // util.toast('Has Reached Bottom');
    let currentPageNo = this.data.pageNo + 1;
    if (this.data.hasMore){
      this.getFeedbackList(this.data.currentStateId, currentPageNo);
    }
  },

  onReady: function () { },
  onShow: function () { },

  // onHide: function () { },
  // onUnload: function () { },
  // onReachBottom: function () { },
  // onShareAppMessage: function () { }
});