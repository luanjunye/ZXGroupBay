const api = require('../../../config/url.js');
const util = require('../../../utils/util.js');

Page({
  data: {
    amount: 0,
    lists: [
/*      {
          id: 5,
          state:1,
          money: 100
          content: "申请提现到微信零钱",
          time: "2019-11-30 10:00:39",
          endTime: null,
      },*/
    ],

    // 分页相关
    pageNo: 1,
    perPageCount: 15, // 每次请求的数量条数
    hasMore: true, // 标记是否还有更多
  },

  onLoad: function (options) {
    this.getWithdrawList(1);
    this.getMoneyAmount();
  },

  // 获取可提现余额
  getMoneyAmount(){
    let that = this;
    util.request(api.CommissionAmount,{
      userId: util.getUserInfo().userId
    }, 'POST').then(res => {
      that.setData({
        amount: res
      })
    })
  },

  // 获取提现记录列表
  getWithdrawList(pageNo){
    let that = this;
    util.request(api.CommissionWithdrawList,{
      userId: util.getUserInfo().userId
    }, 'GET').then(res => {
      let currentLists = that.data.lists.concat(res.list);
      if (currentLists.length === res.totalCount){ // 如果当前返回页面跟总页面数相同，说明没有更多内容了
        that.setData({
          hasMore: false
        })
      }
      that.setData({
        pageNo: pageNo,
        lists: that.data.lists.concat(res.list)
      })
      that.setData({
        lists: res.list
      })
    })
  },

  // 提现操作
  onWidthDraw(){
    if(this.data.amount === 0){
      util.toast('可提现余额不足')
    } else {
      wx.showModal({
        title: '是否确认提现到微信零钱',
        content: '余额将全部提现到微信零钱',
        success: res => {
          if (res.confirm){
            util.request(api.CommissionWithdraw,{
              userId: util.getUserInfo().userId
            }, 'POST').then(res => {
              util.toastSuccess('提现申请已提交')
              setTimeout(()=>{
                that.onload();
              },1500)
            })
          }
        },
      })
    }
  },

  // item 点击跳转详情
  logTaped(e){
    let logId = e.currentTarget.dataset.id;
    let currentItem = e.currentTarget.dataset.value
    // 提现详情目前是没有获取数据，直接从该页传递数据

    wx.setStorageSync('currentWithdrawItem', currentItem);
    wx.navigateTo({
      url: '/pages/userCenter/commissionWithdraw/commissionWithdraw?logid=' + logId
    })
  },



// ========================
  onPullDownRefresh: function () {
    this.setData({
      lists: [],
      pageNo: 1,
      perPageCount: this.data.perPageCount,
      hasMore: true,
    })
    this.onLoad();
  },

  onReachBottom: function () {
    let currentPageNo = this.data.pageNo + 1;
    if (this.data.hasMore){
      this.getWithdrawList(currentPageNo);
    }
  },

  onReady: function () { },
  onShow: function () { },

  // onHide: function () { },
  // onUnload: function () { },
  // onShareAppMessage: function () { }
});