const api = require('../../../config/url.js');
const util = require('../../../utils/util.js');

Page({
  data: {
    startTime: '2019-11-20 23:14:12',
    endTime: util.formateDate(new Date()),

    list:[
/*      {
        url: "https://zexuanshipin.oss-cn-beijing.aliyuncs.com/20191127/32bb9c799aad45038048c0f4c78672f7.jpg",
        name: "烟台苹果 5个约2斤",
        num: 8,
        price: 8,
        commission: 5.12,
        time: "2019-11-28 11:01:47",
        money: 64
      },*/
    ],


    // 分页相关
    pageNo: 1,
    perPageCount: 30, // 每次请求的数量条数
    hasMore: true, // 标记是否还有更多

    // date picker
    isPickerRender: false,
    isPickerShow: false,
    pickerConfig: {
      endDate: true,
      column: "second",
      dateLimit: true,
      initStartTime: "2019-01-01 12:32:44",
      initEndTime: util.formateDate(new Date()),
      limitStartTime: "2015-05-06 12:32:44",
      limitEndTime: "2055-05-06 12:32:44"
    }
  },

  onLoad: function (options) {
    this.getCommissionList(this.data.pageNo)
  },

  getCommissionList(pageNo){
    let that = this;
    util.request(api.CommissionList, {
      userId: util.getUserInfo().userId,
      page: pageNo,
      limit: that.data.perPageCount,
      startTime: that.data.startTime,
      endTime: that.data.endTime
    }, 'GET').then(res => {
      let currentGoodsArray = that.data.list.concat(res.list);
      if (currentGoodsArray.length === res.totalCount){ // 如果当前返回页面跟总页面数相同，说明没有更多内容了
        that.setData({
          hasMore: false
        })
      }
      that.setData({
        pageNo: pageNo,
        list: that.data.list.concat(res.list)
      })
    })
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
    this.onPullDownRefresh();
  },

// ========================
  onPullDownRefresh: function () {
    this.setData({
      list: [],
      pageNo: 1,
      perPageCount: this.data.perPageCount,
      hasMore: true,
    })
    this.getCommissionList(this.data.pageNo); // 刷新类别列表
  },

  onReachBottom: function () {
    // util.toast('Has Reached Bottom');
    let currentPageNo = this.data.pageNo + 1;
    if (this.data.hasMore){
      this.getCommissionList(currentPageNo);
    }
  },

  onReady: function () { },
  onShow: function () { },

  // onHide: function () { },
  // onUnload: function () { },
  // onShareAppMessage: function () { }
});