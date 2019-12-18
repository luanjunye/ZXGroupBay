const util = require('../../../utils/util');
const api = require('../../../config/url.js');

Page({
  data: {
    videoAdded: false,
    groupMaster: false,  // 是否为团长
    userInfo: {
      msgCount: 0,
      avatar: "/assets/mine/nouser.png",
      nickname: "点此处前往登录",
      code: "",
      amountMoney: 0,
      isRegimental: 0,  // 1=是团长 0=团员
      awaitMoney: 0,
      predictMoney: 0,
      orderCount: 0,
      allOrderMoney: 0
    },

    /*
    * 数据结构说明：
    * -------------
    * id: id
    * title: 菜单名字
    * guest: 在未登录的时候是否可点击进入
    * type: 点击菜单时的动作类型： page: 跳转页面   method: 调用方法
    * url: 要跳转的页面名字|要执行的方法名
    * iconUrl: 菜单图标
    * badge: 图标的角标数字
    * */

    // 普通用户菜单组
    menuListNormal: [
      {id: 0, title: '待付款', guest: false, type: 'page',   url: '/pages/order/orderCenter/orderCenter?tab=1' ,iconUrl: '/assets/mine/tab-unpaid.png', badge: 0},
      {id: 1, title: '待收货', guest: false, type: 'page',   url: '/pages/order/orderCenter/orderCenter?tab=2' ,iconUrl: '/assets/mine/tab-receive.png', badge: 0},
      {id: 2, title: '已完成', guest: false, type: 'page',   url: '/pages/order/orderCenter/orderCenter?tab=3' ,iconUrl: '/assets/mine/tab-finished.png', badge: 0},
      {id: 3, title: '售后', guest: false, type: 'page', url: '/pages/order/orderCenter/orderCenter?tab=4' ,iconUrl: '/assets/mine/tab-service.png', badge: 0},
    ],

    // 我的团购菜单组
    menuListGroup: [
      {id: 0, title: '团购订单', guest: false, type: 'page', url: '/pages/userCenter/groupOrder/groupOrder?from=mine' ,iconUrl: '/assets/mine/load-cargo.png', badge: 0},
      {id: 1, title: '签收码',   guest: false, type: 'method', url: 'showDeveloping' ,iconUrl: '/assets/mine/receive-code.png', badge: 0},
      {id: 2, title: '售后反馈', guest: false, type: 'page', url: '/pages/userCenter/feedback/feedback' ,iconUrl: '/assets/mine/feedback.png', badge: 0},
      {id: 3, title: '佣金记录', guest: false, type: 'page', url: '/pages/userCenter/commission/commission' ,iconUrl: '/assets/mine/commission.png', badge: 0},
      {id: 4, title: '团员管理', guest: false, type: 'page', url: '/pages/userCenter/memberManage/memberManage' ,iconUrl: '/assets/mine/member-manage.png', badge: 0},
      {id: 5, title: '历史开团', guest: false, type: 'page', url: '/pages/userCenter/historyGroup/historyGroup' ,iconUrl: '/assets/mine/tuan-history.png', badge: 0},
    ],

    // 营销工具菜单组
    menuListSell: [
      {id: 0, title: '开团海报', guest: false, type: 'page',   url: '/pages/userCenter/poster/poster' ,iconUrl: '/assets/mine/poster.png', badge: 0},
      {id: 1, title: '优惠券包', guest: false, type: 'method', url: 'showDeveloping' ,iconUrl: '/assets/mine/coupon.png', badge: 0},
      {id: 2, title: '优惠活动', guest: false, type: 'method', url: 'showDiscountActivity' ,iconUrl: '/assets/mine/gift.png', badge: 0},
    ],

    // 普通会员菜单
    menuNormal: [
      {id: 0, title: '我要成为团长', guest: false, type: 'method',  url: 'applyGroupMaster' ,iconUrl: '/assets/mine/icon-submit.png', badge: 0},
      {id: 1, title: '优惠券',      guest: false, type: 'method',  url: 'showDeveloping' ,iconUrl: '/assets/mine/icon-coupon.png', badge: 0},
      {id: 2, title: '更换团长',    guest: false, type: 'page',    url: '/pages/regimentalCommander/changeCommander' ,iconUrl: '/assets/mine/icon-switch.png', badge: 0},
      {id: 3, title: '关于泽轩优选', guest: true, type: 'page',    url: '/pages/userCenter/about/about' ,iconUrl: '/assets/mine/icon-about.png', badge: 0},
      // {id: 4, title: '视频播放', guest: false, type: 'page',    url: '/pages/video/video' ,iconUrl: '/assets/mine/icon-about.png', badge: 0},
    ],

    // 团长菜单
    menuMaster: [
      {id: 0, title: '优惠券',         guest: false, type: 'method', url: 'showDeveloping' ,iconUrl: '/assets/mine/icon-coupon.png', badge: 0},
      {id: 1, title: '邀请好友注册团长', guest: false, type: 'method', url: 'showDeveloping' ,iconUrl: '/assets/mine/icon-invitation.png', badge: 0},
      // {id: 1, title: '邀请好友注册团长', guest: false, type: 'page', url: '/pages/userCenter/invitation/invitation' ,iconUrl: '/assets/mine/icon-invitation.png', badge: 0},
      {id: 2, title: '关于泽轩优选',    guest: true, type: 'page', url: '/pages/userCenter/about/about' ,iconUrl: '/assets/mine/icon-about.png', badge: 0},
    ],
  },


  onLoad: function (options) {},
  onShow: function () {
    if(util.getUserInfo().userId){  // 只有登录后才请求用户数据
      this.getUserInformation();
    }
    util.updateCartCount(); // 更新购物车图标 badge
    this.updateVideoStatus()
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

  // 前往登录
  login(){
    if(!util.getUserInfo().userId){
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
  },


  // 获取用户信息
  getUserInformation(){
    let that = this;
    util.request(api.UserInfo, {
      userId: util.getUserInfo().userId
    }, "POST", true).then(res => {
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
    let guest = e.currentTarget.dataset.guest;

    // 未登录 或者  菜单显示为 guest 可点击时，生效
    if(util.getUserInfo().userId || guest){
      if (type === 'page'){ // 跳转页面时
        wx.navigateTo({
          url: pageUrl
        })
      } else {  // 调用方法时
        this[pageUrl]()
      }
    } else {
      util.toast('您当前未登录');
    }
  },

  // 提示开发中
  showDeveloping(){
    util.toast('功能开发中...');
  },

  // 显示优惠活动
  showDiscountActivity(){
    util.request(api.ActivityDiscount, {}, 'GET').then(res => {
      wx.showModal({
        title: '优惠活动',
        content: res? res: '暂时没有优惠活动'
      })
    })
  },



  /* *******
  *  菜单相关
  * ********/

  // 添加视频播放菜单
  showVideo(){
    let videoItem = {id: 4, title: '视频播放', type: 'page',    url: '/pages/video/video' ,iconUrl: '/assets/mine/icon-about.png', badge: 0};
    let menuNormal = this.data.menuNormal;
    let menuMaster = this.data.menuMaster;
    menuMaster.push(videoItem);
    menuNormal.push(videoItem);
    this.setData({
      videoAdded: true,
      menuNormal: menuNormal,
      menuMaster: menuMaster,
    })
  },

  // 刷新菜单展示与否
  updateVideoStatus(){
    let showSwitch = wx.getStorageSync('showVideo');
    if(showSwitch && !this.data.videoAdded){
      this.showVideo()
    }
  },
  
// ========================
  onPullDownRefresh: function () {
    if(util.getUserInfo().userId){  // 只有登录后才请求用户数据
      this.getUserInformation();
    } else {
      wx.stopPullDownRefresh();
      this.setData({
        groupMaster: false,  // 是否为团长
        userInfo: {
          avatar: "/assets/mine/nouser.png",
          msgCount: 0,
          nickname: "点此处前往登录",
          code: "",
          amountMoney: 0,
          isRegimental: 0,  // 1=是团长 0=团员
          awaitMoney: 0,
          predictMoney: 0,
          orderCount: 0,
          allOrderMoney: 0
        },
      })
    }
    this.updateVideoStatus();
  },

  onReady: function () { },


  // onHide: function () { },
  // onUnload: function () { },
  // onReachBottom: function () {},
  // onShareAppMessage: function () { }
});