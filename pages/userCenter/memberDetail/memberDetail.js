const util = require('../../../utils/util');

Page({
  data: {
    member: {

    },

    orderStates: [
      { id:0, title: '全部', active: true},
      { id:1, title: '待付款', active: false},
      { id:2, title: '待收货', active: false},
      { id:3, title: '已完成', active: false},
      { id:4, title: '退款售后', active: false},
    ],
    order: {
      name: '团购ID: 124141',
      date: '2019-11-21 23:34:21',
      state: '待付款',
      imgs: [
        '/assets/list1.jpg',
        '/assets/list1.jpg',
        '/assets/list1.jpg',
        '/assets/list1.jpg',
        '/assets/list1.jpg',
        '/assets/list1.jpg',
      ],
      amount: 234.5,
      count: 5
    }
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
    this.data.orderStates.forEach(item=>{
      tempArray.push({
        id: item.id,
        title: item.title,
        active: index === item.id
      })
    })
    this.setData({
      orderStates: tempArray
    })

    // TODO: 加载对应页面的数据
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