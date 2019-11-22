const util = require('../../../utils/util');

Page({
  data: {
    refundType:[
      '部分赔付',
      '退货退款'
    ],

    ticketType:[
      '质量问题',
      '其它'
    ],
    stateIcon: {
      1: '/assets/mine/ticket-processing.png',
      2: '/assets/mine/ticket-solved.png',
      3: '/assets/mine/ticket-reject.png',
    },

    product: {
      productPrice: 15.3,
      returnPrice: 15.3,
      stateId: 2,
      state:'已解决',
      ticketType: 1,
      refundType: 1,
      ticketNo: 56283481614,
      productId: 1536,
      orderId: 7123568476,
      nickName: '飞鱼',
      applyDateTime: '2019-11-21 11:23:12',
      solveDateTime: '2019-11-21 11:23:12',
      applyCount: 1,
      title: '果冻橙果申请退款',
      description: '物品损坏，物品已退回公司，申请退款',
      evidences: [
        '/assets/list1.jpg',
        '/assets/list1.jpg',
        '/assets/list1.jpg',
      ],
      price: 15.3,
      specs: '6x100g/袋',
      buyCount: 6,
      name: '紫米面包6袋，110g/袋',
      picUrl: '/assets/list1.jpg',
      buyer: '飞鱼',
    }
  },

  onLoad: function (options) {
    let ticketNo = options.ticketno; // 获取工单id
    // TODO：获取工单详情网络数据

  },

  // 预览图片
  showCurrentPic(e) {
    let index = e.currentTarget.dataset.index;
    let that = this;
    if (that.data.product.evidences.length < 1) {
      return
    } else {
      wx.previewImage({
        urls: [that.data.product.evidences[index]],
      })
    }
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