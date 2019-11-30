const util = require('../../../utils/util');

Page({
  data: {
    stateIcon: {
      1: '/assets/mine/ticket-processing.png', // 审核中
      2: '/assets/mine/ticket-solved.png', // 已完成
      3: '/assets/mine/ticket-reject.png', // 拒绝
    },

    commission: {
/*      state:1,
      id: 5,
      money: 100,
      content: "申请提现到微信零钱",
      time: "2019-11-30 10:00:39",
      endTime: null*/
    }
  },

  onLoad: function (options) {
    let logId = options.logId; // 获取记录 id
    // TODO：获取记录详情网络数据

    let currentItem = wx.getStorageSync('currentWithdrawItem');
    this.setData({
      commission: currentItem
    })

  },

  // 预览图片
  showCurrentPic(e) {
    let index = e.currentTarget.dataset.index;
    let that = this;
    if (that.data.product.evidences.length < 1) {
      return
    } else {
      wx.previewImage({
        urls: [that.data.product.evidences[index]],
      })
    }
  },



// ========================
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },

  onReady: function () { },
  onShow: function () { },

  // onHide: function () { },
  // onUnload: function () { },
  // onReachBottom: function () { },
  // onShareAppMessage: function () { }
});