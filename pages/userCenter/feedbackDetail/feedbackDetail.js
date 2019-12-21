const api = require('../../../config/url.js');
const util = require('../../../utils/util.js');

Page({
    data: {
      ticketState: [
        {id: 1, name: '待审核', icon: '/assets/mine/ticket-processing.png'},
        {id: 2, name: '处理中', icon: '/assets/mine/ticket-processing.png'},
        {id: 3, name: '已完成', icon: '/assets/mine/ticket-solved.png'},
        {id: 4, name: '拒绝', icon: '/assets/mine/ticket-reject.png'},
      ],
    ticketNo: 0,
    ticket: {
      /*      statusName: "待审核",
            name: "烟台苹果 5个约2斤",
            goodsUrl: "https://zexuanshipin.oss-cn-beijing.aliyuncs.com/20191127/32bb9c799aad45038048c0f4c78672f7.jpg",
            price: 20,
            money: 64
            realMoney: null
            status: 1,
            num: 1,
            orderNum: "T20191128154509788614920",
            workOrderNum: "20191128154509788614920",
            typeName: "质量问题",
            stateName: "部分赔付",
            info: "",
            crateTime: "2019-11-29 14:54:52",
            updateTime: "2019-11-29 15:32:42",
            url: [
              "https://zexuanxiaochengxu.oss-cn-hangzhou.aliyuncs.com/images/2019-11-29/157501023788126.png",
              "https://zexuanxiaochengxu.oss-cn-hangzhou.aliyuncs.com/images/2019-11-29/157501023793719.png",
              "https://zexuanxiaochengxu.oss-cn-hangzhou.aliyuncs.com/images/2019-11-29/157501023797574.png",
              "https://zexuanxiaochengxu.oss-cn-hangzhou.aliyuncs.com/images/2019-11-29/1575010238032103.png"
            ]*/
    }
  },

  onLoad: function (options) {
    let ticketNo = Number(options.ticketno); // 获取工单id
    this.setData({
      ticketNo: ticketNo
    })
    // 获取工单详情
    this.getTicketInfo(ticketNo);
  },


  getTicketInfo(ticketNo){
    let that = this;
    util.request(api.FeedbackInfo, {
      id: ticketNo
    }, 'POST').then(res => {
      that.setData({
        ticket: res
      })
    })
  },


  // 预览图片
  showCurrentPic(e) {
    let index = e.currentTarget.dataset.index;
    let that = this;
    if (that.data.ticket.url.length < 1) {
      return
    } else {
      wx.previewImage({
        urls: [that.data.ticket.url[index]],
      })
    }
  },



// ========================
  onPullDownRefresh: function () {
    this.getTicketInfo(this.data.ticketNo)
  },

  onReady: function () { },
  onShow: function () { },

  // onHide: function () { },
  // onUnload: function () { },
  // onReachBottom: function () { },
  // onShareAppMessage: function () { }
});