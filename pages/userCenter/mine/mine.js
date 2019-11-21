const util = require('../../../utils/util');

Page({
  data: {
    groupMaster: false,  // 是否为团长
    applyState: 'none',  // none | pending

    // 普通用户菜单组
    menuListNormal: [
      {id: 0, title: '待付款', url: '/pages/order/orderCenter/orderCenter?tab=1' ,iconUrl: '/assets/mine/tab-unpaid.png', badge: 4},
      {id: 1, title: '待收货', url: '/pages/order/orderCenter/orderCenter?tab=2' ,iconUrl: '/assets/mine/tab-receive.png', badge: 12},
      {id: 2, title: '已完成', url: '/pages/order/orderCenter/orderCenter?tab=3' ,iconUrl: '/assets/mine/tab-finished.png', badge: 325},
      {id: 3, title: '退款售后', url: '/pages/order/orderCenter/orderCenter?tab=4' ,iconUrl: '/assets/mine/tab-service.png', badge: 5},
    ],

    // 我的团购菜单组
    menuListGroup: [
      {id: 0, title: '历史开团', url: '/pages/userCenter/history/history?tab=1' ,iconUrl: '/assets/mine/tuan-history.png', badge: 12},
      {id: 1, title: '签收码', url: '/pages/userCenter/receiveCode/receiveCode?tab=2' ,iconUrl: '/assets/mine/receive-code.png', badge: 0},
      {id: 2, title: '待提货订单', url: '/pages/userCenter/loadCargo/loadCargo?tab=3' ,iconUrl: '/assets/mine/load-cargo.png', badge: 2},
      {id: 3, title: '售后反馈', url: '/pages/userCenter/feedback/feedback?tab=4' ,iconUrl: '/assets/mine/feedback.png', badge: 6},
      {id: 4, title: '佣金记录', url: '/pages/userCenter/commission/commission?tab=4' ,iconUrl: '/assets/mine/commission.png', badge: 0},
      {id: 5, title: '团员管理', url: '/pages/userCenter/memberManage/memberManage?tab=4' ,iconUrl: '/assets/mine/member-manage.png', badge: 324},
    ],

    // 营销工具菜单组
    menuListSell: [
      {id: 0, title: '开团海报', url: '/pages/userCenter/poster/poster?tab=1' ,iconUrl: '/assets/mine/poster.png', badge: 0},
      {id: 1, title: '优惠券包', url: '/pages/userCenter/coupon/coupon?tab=2' ,iconUrl: '/assets/mine/coupon.png', badge: 4},
      {id: 2, title: '购买奖励', url: '/pages/userCenter/user/user?tab=3' ,iconUrl: '/assets/mine/gift.png', badge: 0},
    ],

    // 普通会员菜单
    menuNormal: [
      {id: 0, title: '申请团长', url: '/pages/userCenter/poster/poster?tab=1' ,iconUrl: '/assets/mine/icon-submit.png', badge: 0},
      {id: 1, title: '优惠券', url: '/pages/userCenter/coupon/coupon?tab=2' ,iconUrl: '/assets/mine/icon-coupon.png', badge: 4},
      {id: 2, title: '切换团长', url: '/pages/userCenter/user/user?tab=3' ,iconUrl: '/assets/mine/icon-switch.png', badge: 0},
      {id: 3, title: '关于泽轩优选', url: '/pages/userCenter/about/about?tab=3' ,iconUrl: '/assets/mine/icon-about.png', badge: 0},
    ],

    // 团长菜单
    menuMaster: [
      {id: 0, title: '优惠券', url: '/pages/userCenter/coupon/coupon?tab=2' ,iconUrl: '/assets/mine/icon-coupon.png', badge: 4},
      {id: 1, title: '关于泽轩优选', url: '/pages/userCenter/about/about?tab=3' ,iconUrl: '/assets/mine/icon-about.png', badge: 0},
      {id: 2, title: '邀请好友注册团长', url: '/pages/userCenter/user/user?tab=3' ,iconUrl: '/assets/mine/icon-invitation.png', badge: 0},
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