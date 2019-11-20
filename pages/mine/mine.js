const util = require('../../utils/util');

Page({
  data: {
    groupMaster: false,  // 是否为团长
    applyState: 'none', // none | pending

    // 普通用户菜单组
    menuListNormal: [
      {id: 0, title: '待付款', url: '/pages/order/orderCenter/orderCenter?tab=1' ,iconUrl: '/assets/mine/tab-unpaid.png', badge: 4},
      {id: 1, title: '待收货', url: '/pages/order/orderCenter/orderCenter?tab=2' ,iconUrl: '/assets/mine/tab-receive.png', badge: 412},
      {id: 2, title: '待评价', url: '/pages/order/orderCenter/orderCenter?tab=3' ,iconUrl: '/assets/mine/tab-comment.png', badge: 0},
      {id: 3, title: '退款售后', url: '/pages/order/orderCenter/orderCenter?tab=4' ,iconUrl: '/assets/mine/tab-service.png', badge: 0},
    ]
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

  // 菜单点击
  switchMenu(e){
    let pageUrl = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: pageUrl
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