const util = require('../../utils/util');

Page({
  data: {
    groupMaster: false,  // 是否为团长
    applyState: 'none',  // none | pending

    // 普通用户菜单组
    menuListNormal: [
      {id: 0, title: '待付款', url: '/pages/order/orderCenter/orderCenter?tab=1' ,iconUrl: '/assets/mine/tab-unpaid.png', badge: 4},
      {id: 1, title: '待收货', url: '/pages/order/orderCenter/orderCenter?tab=2' ,iconUrl: '/assets/mine/tab-receive.png', badge: 412},
      {id: 2, title: '已完成', url: '/pages/order/orderCenter/orderCenter?tab=3' ,iconUrl: '/assets/mine/tab-finished.png', badge: 0},
      {id: 3, title: '退款售后', url: '/pages/order/orderCenter/orderCenter?tab=4' ,iconUrl: '/assets/mine/tab-service.png', badge: 0},
    ],

    // 我的团购菜单组
    menuListGroup: [
      {id: 0, title: '历史开团', url: '/pages/order/orderCenter/orderCenter?tab=1' ,iconUrl: '/assets/mine/tuan-history.png', badge: 4},
      {id: 1, title: '签收码', url: '/pages/order/orderCenter/orderCenter?tab=2' ,iconUrl: '/assets/mine/receive-code.png', badge: 412},
      {id: 2, title: '待提货订单', url: '/pages/order/orderCenter/orderCenter?tab=3' ,iconUrl: '/assets/mine/load-cargo.png', badge: 0},
      {id: 3, title: '售后反馈', url: '/pages/order/orderCenter/orderCenter?tab=4' ,iconUrl: '/assets/mine/feedback.png', badge: 34},
      {id: 4, title: '佣金记录', url: '/pages/order/orderCenter/orderCenter?tab=4' ,iconUrl: '/assets/mine/commission.png', badge: 6},
      {id: 5, title: '团员管理', url: '/pages/order/orderCenter/orderCenter?tab=4' ,iconUrl: '/assets/mine/member-manage.png', badge: 1},
    ],

    // 营销工具菜单组
    menuListSell: [
      {id: 0, title: '开团海报', url: '/pages/order/orderCenter/orderCenter?tab=1' ,iconUrl: '/assets/mine/poster.png', badge: 4},
      {id: 1, title: '优惠券包', url: '/pages/order/orderCenter/orderCenter?tab=2' ,iconUrl: '/assets/mine/coupon.png', badge: 412},
      {id: 2, title: '购买奖励', url: '/pages/order/orderCenter/orderCenter?tab=3' ,iconUrl: '/assets/mine/gift.png', badge: 0},
    ],
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

  // 切换用户状态  普通 | 团长
  switchUserState(){ // Test
    this.setData({
      groupMaster: !this.data.groupMaster
    })

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