const util = require('../../../utils/util');

Page({
  data: {
    stateIcon: {
      1: '/assets/mine/icon-about.png',
      2: '/assets/mine/icon-about.png',
      3: '/assets/mine/icon-about.png',
    },

    detailData: {
      productPrice: 15.3,
      returnPrice: 15.3,
      stateId: 1,
      state:'已解决',
      type: '质量问题',
      no: '56283481614',
      productId: 1536,
      orderId: 7123568476,
      nickName: '飞鱼',
      applyDateTime: '2019-11-21 11:23:12',
      applyCount: 1,
      title: '果冻橙果申请退款',
      description: '物品损坏，物品已退回公司，申请退款',
      evidences: [
        '/assets/list1.jpg',
        '/assets/list1.jpg',
        '/assets/list1.jpg',
      ]
    }
  },

  onLoad: function (options) {

  },

  // 预览图片
  showCurrentPic(e) {
    let index = e.currentTarget.dataset.index;
    let that = this;
    if (that.data.detailData.evidences.length < 1) {
      return
    } else {
      wx.previewImage({
        urls: [that.data.detailData.evidences[index]],
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