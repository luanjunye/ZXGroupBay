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
/*      {
        id: 1,
        teamUserId: 2,
        userId: 2,
        type: 1,
        status: 1,
        goodsId: 31,
        orderNum: "T20191128154509788614920",
        number: 1,
        describe: "",
        createTime: "2019-11-29 14:54:52",
        state: 1
      }*/
    ],

    currentStateId: 0,

    // 分页相关
    pageNo: 1,
    perPageCount: 15, // 每次请求的数量条数
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
      // TODO: 返回数据有问题
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