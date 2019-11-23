const util = require('../../../utils/util');

Page({
  data: {
    amount: 20.8,
    lists: [
      {id: 1, title: '提现到微信零钱成功',date: '2019-11-12 23:34:12', amount: '762.2'},
      {id: 2, title: '提现到微信零钱成功',date: '2019-11-12 23:34:12', amount: '123.2'},
      {id: 3, title: '提现到微信零钱成功',date: '2019-11-12 23:34:12', amount: '123.2'},
      {id: 4, title: '提现到微信零钱成功',date: '2019-11-12 23:34:12', amount: '123.2'},
      {id: 5, title: '提现到微信零钱成功',date: '2019-11-12 23:34:12', amount: '123.2'},
      {id: 6, title: '提现到微信零钱成功',date: '2019-11-12 23:34:12', amount: '123.2'},
      {id: 7, title: '提现到微信零钱成功',date: '2019-11-12 23:34:12', amount: '123.2'},
    ]
  },

  onLoad: function (options) {},

  onWidthDraw(){
    wx.showModal({
      title: '是否确认提现到微信零钱',
      content: '余额将全部提现到微信零钱',
      success: res => {
        if (res.confirm){
          // TODO: 提现操作
        }
      },
    })
  },

// ========================
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },

  logTaped(e){
    let logId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/userCenter/commissionWithdraw/commissionWithdraw?logid=' + logId
    })
  },

  onReady: function () { },
  onShow: function () { },

  // onHide: function () { },
  // onUnload: function () { },
  // onReachBottom: function () { },
  // onShareAppMessage: function () { }
});