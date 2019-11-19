const util = require('../../utils/util');

Page({
  data: {
    groupMaster: false,
    applyState: 'none', // none | pending
  },


  applyGroupMaster(){
    if (this.data.applyState === 'pending'){
      wx.showToast({
        icon: 'none',
        title: '您已提交过申请了,请耐心等待审核'
      })
    } else {
      wx.navigateTo({
        url: '/pages/group/apply/apply',
      })
    }

  },

  onLoad: function (options) {

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