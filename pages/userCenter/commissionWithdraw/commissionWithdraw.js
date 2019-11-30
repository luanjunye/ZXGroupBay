const util = require('../../../utils/util');

Page({
  data: {
    stateIcon: {
      1: '/assets/mine/ticket-processing.png', // 申请中
      2: '/assets/mine/ticket-processing.png', // 审核中
      3: '/assets/mine/ticket-solved.png', // 已完成
      4: '/assets/mine/ticket-reject.png', // 拒绝
    },

    commission: {
      commissionApply: 12,
      commissionActual: 11.6,
      timeCommissionApply: '2019-11-23 14:23.12',
      timeCommissionReceive: '2019-11-24 14:23.12',
      state: '已提现到微信零钱',
      icon: 2
    }
  },

  onLoad: function (options) {
    let logId = options.logId; // 获取记录 id
    // TODO：获取记录详情网络数据

    let currentItem = wx.getStorageSync('currentWithdrawItem');
    this.setData({

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