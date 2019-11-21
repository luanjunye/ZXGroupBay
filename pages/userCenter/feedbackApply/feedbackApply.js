const util = require('../../../utils/util');

Page({
  data: {
    // navbar
    navbarTabs: [
      { id:0, title: '全部', active: true},
      { id:1, title: '待审核', active: false},
      { id:2, title: '处理中', active: false},
      { id:3, title: '已完成', active: false},
    ],

    feedbackList: [
      {id: 1, title: '果冻橙申请售后', date: '2019-11-21 13:24:23', state: 1},
      {id: 2, title: '蓝莓申请退款', date: '2019-11-21 13:24:23', state: 2},
      {id: 3, title: '玉米理赔', date: '2019-11-21 13:24:23', state: 3},
      {id: 4, title: '蓝莓申请退款', date: '2019-11-21 13:24:23', state: 2},
      {id: 5, title: '蓝莓申请退款', date: '2019-11-21 13:24:23', state: 2},
      {id: 6, title: '果冻橙申请售后', date: '2019-11-21 13:24:23', state: 1},
      {id: 7, title: '果冻橙申请售后', date: '2019-11-21 13:24:23', state: 1},
    ]

  },

  onLoad: function (options) {

  },

  // 订单状态点击
  navbarTaped(e){
    let index = e.currentTarget.dataset.index;
    this.switchState(index);
  },


// 订单状态切换
  switchState(index){
    let tempArray = [];
    this.data.navbarTabs.forEach(item=>{
      tempArray.push({
        id: item.id,
        title: item.title,
        active: index === item.id
      })
    })
    this.setData({
      navbarTabs: tempArray
    })

    // TODO: 加载对应页面的数据
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