const util = require('../../../utils/util');

Page({
  data: {
    list: [
      {id: 0, title: '关于泽轩', url: '/pages/userCenter/aboutUs/aboutUs'},
      {id: 1, title: '用户协议', url: '/pages/userCenter/agreement/agreement'},
      {id: 2, title: '常见问题', url: '/pages/userCenter/questions/questions'},
      {id: 3, title: '名词解释', url: ''},
    ]
  },

  onLoad: function (options) {

  },

  // 跳转页面
  menuListTaped(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: this.data.list[id].url
    })
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