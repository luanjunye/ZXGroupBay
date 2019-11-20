const util = require('../../../utils/util');

Page({
  data: {
    pageNo: 1,
    orderStates: [
      { id:0, title: '全部', active: true},
      { id:1, title: '待付款', active: false},
      { id:2, title: '待收货', active: false},
      { id:3, title: '已完成', active: false},
      { id:4, title: '已取消', active: false},
    ]

  },

  onLoad: function (options) {
    // console.log(options);
    let currentTabId = options.tab; // 传参过来的 id 是 String
    this.switchState(Number(currentTabId))
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

  // 加载订单数据
  loadDiaryContent(pageNo){

  },



// ========================
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },

  // 加载分页数据
  onReachBottom: function () {
    this.setData({
      pageNo: this.data.pageNo + 1
    })
    this.loadDiaryContent(this.data.pageNo)
    util.toast('Reached Bottom: '+ this.data.pageNo);
  },


  onReady: function () { },
  onShow: function () { },

  // onHide: function () { },
  // onUnload: function () { },
  // onShareAppMessage: function () { }
});