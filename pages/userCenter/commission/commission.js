const util = require('../../../utils/util');

Page({
  data: {
    startTime: '2019-11-20 23:14:12',
    endTime: '2019-11-22 12:14:12',

    product: {
      name: '海底捞蘸料 / 1袋',
      date: '2019-11-21 23:34:21',
      commission: 2.34,
      count: 1,
      price: 8.99,
      pic: '/assets/list1.jpg'
    },

    // date picker
    isPickerRender: false,
    isPickerShow: false,
    pickerConfig: {
      endDate: true,
      column: "second",
      dateLimit: true,
      initStartTime: "2019-01-01 12:32:44",
      initEndTime: "2019-12-01 12:32:44",
      limitStartTime: "2015-05-06 12:32:44",
      limitEndTime: "2055-05-06 12:32:44"
    }
  },

  onLoad: function (options) {

  },


  // 日期选择 相关
  pickerShow: function() {
    this.setData({
      isPickerShow: true,
      isPickerRender: true,
      chartHide: true
    });
  },
  pickerHide: function() {
    this.setData({
      isPickerShow: false,
      chartHide: false
    });
  },

  setPickerTime: function(val) {
    console.log(val);
    let data = val.detail;
    this.setData({
      startTime: data.startTime,
      endTime: data.endTime,
      ['pickerConfig.initStartTime']: data.startTime,
      ['pickerConfig.initEndTime']: data.endTime
    });
  },

  searchConfirm(){
    // TODO: 写提交
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