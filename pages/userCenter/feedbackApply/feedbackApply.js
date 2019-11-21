const util = require('../../../utils/util');

Page({
  data: {

    detailData: {
      productPrice: 15.3,
      returnPrice: 15.3,
      stateId: 1,
      state:'已解决',
      type: '质量问题',
      ticketNo: 56283481614,
      productId: 1536,
      orderId: 7123568476,
      nickName: '飞鱼',
      applyDateTime: '2019-11-21 11:23:12',
      applyCount: 1,
      title: '果冻橙果申请退款',
      description: '物品损坏，物品已退回公司，申请退款',
      evidences: [
        '/assets/list1.jpg',
        '/assets/list1.jpg',
        '/assets/list1.jpg',
      ]
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