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

  },


// 订单状态筛选
  switchState(e){
    let index = e.currentTarget.dataset.index;
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