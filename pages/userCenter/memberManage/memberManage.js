const util = require('../../../utils/util');

Page({
  data: {
    members: [
      {id: 1, headPic: '/assets/avater.png', name: 'FlyFish', wxId: 'b_kyle', amount: '762.2'},
      {id: 2, headPic: '/assets/avater.png', name: '掏下水道的猴', wxId: 'b_kyle', amount: '123.2'},
      {id: 3, headPic: '/assets/avater.png', name: '掏下水道的猴', wxId: 'b_kyle', amount: '123.2'},
      {id: 4, headPic: '/assets/avater.png', name: '掏下水道的猴', wxId: 'b_kyle', amount: '123.2'},
      {id: 5, headPic: '/assets/avater.png', name: '掏下水道的猴', wxId: 'b_kyle', amount: '123.2'},
      {id: 6, headPic: '/assets/avater.png', name: '掏下水道的猴', wxId: 'b_kyle', amount: '123.2'},
      {id: 7, headPic: '/assets/avater.png', name: '掏下水道的猴', wxId: 'b_kyle', amount: '123.2'},
    ]
  },

  onLoad: function (options) {

  },

// ========================
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },

  memberTaped(e){
    let memberId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/userCenter/memberDetail/memberDetail?memberId=' + memberId
    })
  },

  onReady: function () { },
  onShow: function () { },

  // onHide: function () { },
  // onUnload: function () { },
  // onReachBottom: function () { },
  // onShareAppMessage: function () { }
});