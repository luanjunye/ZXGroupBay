const util = require('../../../utils/util');
const api = require('../../../config/url.js');

Page({
  data: {
    groupMaster: true,  // 是否为团长
    messageCount: 0,
    userInfo: {
/*      avatar: "https://wx.qlogo.cn/mmopen/vi_32/AIdAmibzdhn40DjpvD3Tce9ZCbZkO3VLrRFfItR8uquB7PAJDH1yuMCNicJJtsbkVJUuKVmFLZ7v3oVaicDmeJlXw/132",
      nickname: "十月",
      code: "778697298",
      amountMoney: 100,
      isRegimental: 0,  // 1=是团长 0=团员
      awaitMoney: 0,
      predictMoney: 168.96,
      orderCount: 33,
      allOrderMoney: 2112*/
    },

    // 普通用户菜单组
    menuListNormal: [
      {id: 0, title: '待付款', type: 'page',   url: '/pages/order/orderCenter/orderCenter?tab=1' ,iconUrl: '/assets/mine/tab-unpaid.png', badge: 0},
      {id: 1, title: '待收货', type: 'page',   url: '/pages/order/orderCenter/orderCenter?tab=2' ,iconUrl: '/assets/mine/tab-receive.png', badge: 0},
      {id: 2, title: '已完成', type: 'page',   url: '/pages/order/orderCenter/orderCenter?tab=3' ,iconUrl: '/assets/mine/tab-finished.png', badge: 0},
      {id: 3, title: '退款售后', type: 'page', url: '/pages/order/orderCenter/orderCenter?tab=4' ,iconUrl: '/assets/mine/tab-service.png', badge: 0},
    ],

    // 我的团购菜单组
    menuListGroup: [
      {id: 0, title: '团购订单', type: 'page', url: '/pages/userCenter/groupOrder/groupOrder?from=mine' ,iconUrl: '/assets/mine/load-cargo.png', badge: 0},
      {id: 1, title: '签收码',   type: 'page', url: '/pages/userCenter/receiveCode/receiveCode' ,iconUrl: '/assets/mine/receive-code.png', badge: 0},
      {id: 2, title: '售后反馈', type: 'page', url: '/pages/userCenter/feedback/feedback' ,iconUrl: '/assets/mine/feedback.png', badge: 0},
      {id: 3, title: '佣金记录', type: 'page', url: '/pages/userCenter/commission/commission' ,iconUrl: '/assets/mine/commission.png', badge: 0},
      {id: 4, title: '团员管理', type: 'page', url: '/pages/userCenter/memberManage/memberManage' ,iconUrl: '/assets/mine/member-manage.png', badge: 0},
      {id: 5, title: '历史开团', type: 'page', url: '/pages/userCenter/historyGroup/historyGroup' ,iconUrl: '/assets/mine/tuan-history.png', badge: 0},
    ],

    // 营销工具菜单组
    menuListSell: [
      {id: 0, title: '开团海报', type: 'page',   url: '/pages/userCenter/poster/poster' ,iconUrl: '/assets/mine/poster.png', badge: 0},
      {id: 1, title: '优惠券包', type: 'method', url: 'showDeveloping' ,iconUrl: '/assets/mine/coupon.png', badge: 0},
      {id: 2, title: '优惠活动', type: 'method', url: 'showDiscountActivity' ,iconUrl: '/assets/mine/gift.png', badge: 0},
    ],

    // 普通会员菜单
    // 申请团长菜单项，单独在列出来
    menuNormal: [
      {id: 0, title: '我要成为团长', type: 'method',  url: 'applyGroupMaster' ,iconUrl: '/assets/mine/icon-submit.png', badge: 0},
      {id: 1, title: '优惠券',      type: 'method',  url: 'showDeveloping' ,iconUrl: '/assets/mine/icon-coupon.png', badge: 0},
      {id: 2, title: '更换团长',    type: 'page',    url: '/pages/userCenter/user/user' ,iconUrl: '/assets/mine/icon-switch.png', badge: 0},
      {id: 3, title: '关于泽轩优选', type: 'page',    url: '/pages/userCenter/about/about' ,iconUrl: '/assets/mine/icon-about.png', badge: 0},
      {id: 4, title: '视频播放', type: 'page',    url: '/pages/video/video' ,iconUrl: '/assets/mine/icon-about.png', badge: 0},
    ],

    // 团长菜单
    menuMaster: [
      {id: 0, title: '优惠券',         type: 'method', url: 'showDeveloping' ,iconUrl: '/assets/mine/icon-coupon.png', badge: 0},
      {id: 1, title: '关于泽轩优选',    type: 'page', url: '/pages/userCenter/about/about' ,iconUrl: '/assets/mine/icon-about.png', badge: 0},
      {id: 2, title: '邀请好友注册团长', type: 'page', url: '/pages/userCenter/invitation/invitation' ,iconUrl: '/assets/mine/icon-invitation.png', badge: 0},
    ],
  },


  onLoad: function (options) {
    this.getUserInformation();
  },

  // 申请团长点击时
  applyGroupMaster(){

    util.request(api.MasterStateCheck, {
      userId: util.getUserInfo().userId
    }, "POST").then(res => {
      if (res === 1){ // 已申请过
        wx.showToast({
          icon: 'none',
          title: '您已提交过申请了,请耐心等待审核',
          duration: 3000
        })
      } else {
        wx.navigateTo({
          url: '/pages/userCenter/apply/apply',
        })
      }
    })
  },



  // 获取用户信息
  getUserInformation(){
    let that = this;
    util.request(api.UserInfo, {
      userId: util.getUserInfo().userId
    }, "POST").then(res => {
      wx.setStorageSync('isMaster', Boolean(res.isRegimental)); // 更新 storage 用户状态：是否为团长
      that.setData({
        userInfo: res,
        groupMaster: Boolean(res.isRegimental) // 更新状态：是否为团长
      })
    })
  },


  // 菜单点击
  switchMenu(e){
    let pageUrl = e.currentTarget.dataset.url;
    let type = e.currentTarget.dataset.type;
    if (type === 'page'){ // 跳转页面时
      wx.navigateTo({
        url: pageUrl
      })
    } else {  // 调用方法时
      this[pageUrl]()
    }
  },

  // 提示开发中
  showDeveloping(){
    util.toast('功能开发中...')
  },

  showDiscountActivity(){
    util.request(api.ActivityDiscount, {}, 'GET').then(res => {
      wx.showModal({
        title: '优惠活动',
        content: res,
      })
    })
  },

  // 测试 切换团长与否 TODO: 正式上线前删除该处
  switchUserState(){
    this.setData({
      groupMaster: !this.data.groupMaster
    })
  },


// ========================
  onPullDownRefresh: function () {
    this.getUserInformation();
  },

  onReady: function () { },
  onShow: function () { },

  // onHide: function () { },
  // onUnload: function () { },
  // onReachBottom: function () { },
  // onShareAppMessage: function () { }
});