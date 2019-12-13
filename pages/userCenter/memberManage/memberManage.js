const api = require('../../../config/url.js');
const util = require('../../../utils/util.js');

Page({
  data: {
    members: [
      /* 数据结构
      * {
        "userId": 2,
        "nickname": "十月",
        "avatar": "https://wx.qlogo.cn/mmopen/vi_32/AIdAmibzdhn40DjpvD3Tce9ZCbZkO3VLrRFfItR8uquB7PAJDH1yuMCNicJJtsbkVJUuKVmFLZ7v3oVaicDmeJlXw/132",
        "money": 0,
        "code": "778697298"
      }
      * */
    ],



    // 分页相关
    pageNo: 1,
    perPageCount: 30, // 每次请求的数量条数
    hasMore: true, // 标记是否还有更多
  },

  onLoad: function (options) {
    this.getMemberList(this.data.pageNo);
  },


  // 载入成员列表
  getMemberList(pageNo){
    let that = this;
    util.request(api.MemberList, {
      userId: util.getUserInfo().userId,
      page: pageNo,
      limit: that.data.perPageCount
    }, 'GET').then(res => {
      let currentMemberList = that.data.members.concat(res.list);
      if (currentMemberList.length === res.totalCount){ // 如果当前返回页面跟总页面数相同，说明没有更多内容了
        that.setData({
          hasMore: false
        })
      }
      that.setData({
        pageNo: pageNo,
        members: that.data.members.concat(res.list)
      })
    })
  },

  // 成员跳转
  memberTaped(e){
    let memberUserId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/userCenter/memberDetail/memberDetail?memberUserId=' + memberUserId
    })
  },



// ========================
  onPullDownRefresh: function () {
    this.setData({
      members: [],
      pageNo: 1,
      perPageCount: this.data.perPageCount,
      hasMore: true,
    })
    this.onLoad();
  },

  onReachBottom: function () {
    // util.toast('Has Reached Bottom');
    let currentPageNo = this.data.pageNo + 1;
    if (this.data.hasMore){
      this.getMemberList(currentPageNo);
    }
  },


  onReady: function () { },
  onShow: function () { },

  // onHide: function () { },
  // onUnload: function () { },
  // onShareAppMessage: function () { }
});