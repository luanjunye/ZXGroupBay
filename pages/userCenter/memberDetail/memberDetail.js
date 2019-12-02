const api = require('../../../config/url.js');
const util = require('../../../utils/util.js');

Page({
  data: {
    member: {
/*
      name: "十月",
      avatar: "https://wx.qlogo.cn/mmopen/vi_32/AIdAmibzdhn40DjpvD3Tce9ZCbZkO3VLrRFfItR8uquB7PAJDH1yuMCNicJJtsbkVJUuKVmFLZ7v3oVaicDmeJlXw/132",
      code: "778697298",
      money: 0,
      num: 0
      */
    },
    memberId: Number,

    orderStates: [
      { id:0, title: '全部', active: true},
      { id:1, title: '待付款', active: false},
      { id:2, title: '待收货', active: false},
      { id:3, title: '已完成', active: false},
      { id:4, title: '退款售后', active: false},
    ],
    currentStateId: 0,
    orders: [
      /*      {
                "id": 33,
                "name": "十月",
                "avatar": "https://wx.qlogo.cn/mmopen/vi_32/AIdAmibzdhn40DjpvD3Tce9ZCbZkO3VLrRFfItR8uquB7PAJDH1yuMCNicJJtsbkVJUuKVmFLZ7v3oVaicDmeJlXw/132",
                "time": "2019-11-28 15:45:10",
                "money": 64,
                "num": 1,
                "url": [
                  "https://zexuanshipin.oss-cn-beijing.aliyuncs.com/20191127/32bb9c799aad45038048c0f4c78672f7.jpg"
                ],
                "statusName": "待付款",
                "shippingStatus": 1,
                "failPayTime": "2019-11-28 15:50:10",
                "code": 1
              }*/
    ],

    // 分页相关
    pageNo: 1,
    perPageCount: 15, // 每次请求的数量条数
    hasMore: true, // 标记是否还有更多
  },

  onLoad: function (options) {
    let memberUserId = options.memberUserId;
    this.setData({
      memberUserId: Number(memberUserId)
    });
    // 获取团员信息
    this.getMemberInfo();
    // 载入当前状态订单列表
    this.switchState(this.data.currentStateId);
  },

  // 获取团员信息
  getMemberInfo(){
    let that = this;
    util.request(api.MemberInfo, {
      userId: that.data.memberUserId
    },'POST').then(res => {
      that.setData({
        member: res
      })
    })
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
      currentStateID: index,
      orderStates: tempArray,
      orders: [],
      currentStateId: index,
      pageNo: 1,
      perPageCount: this.data.perPageCount,
      hasMore: true,
    })
    // 加载对应状态的订单数据
    this.getOrderList(index, this.data.pageNo)
  },

  // 加载订单数据
  getOrderList(currentStateId, pageNo){
    let that = this;
    util.request(api.MemberOrderList, {
      userId: that.data.memberUserId,
      status: currentStateId,
      page: pageNo,
      limit: that.data.perPageCount
    }, 'GET').then(res => {
      let tempOrderArray = that.data.orders.concat(res.list);
      if (tempOrderArray.length === res.totalCount){ // 如果当前返回页面跟总页面数相同，说明没有更多内容了
        that.setData({
          hasMore: false
        })
      }
      that.setData({
        pageNo: pageNo,
        orders: tempOrderArray
      })
    })
  },

  // 跳转到订单详情页
  toOrderDetail(e){
    let orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/order/orderDetails/orderDetails?orderid=' + orderId
    })
  },


// ========================
  onPullDownRefresh: function () {
    this.setData({
      orders: [],
      pageNo: 1,
      perPageCount: this.data.perPageCount,
      hasMore: true,
    })
    // 获取团员信息
    this.getMemberInfo();
    // 载入当前状态订单列表
    this.switchState(this.data.currentStateId);
  },

  // 加载分页数据
  onReachBottom: function () {
    // util.toast('Has Reached Bottom');
    let currentPageNo = this.data.pageNo + 1;
    if (this.data.hasMore){
      this.getOrderList(this.data.currentStateId, currentPageNo);
    }
  },

  onReady: function () { },
  onShow: function () { },

  // onHide: function () { },
  // onUnload: function () { },
  // onReachBottom: function () { },
  // onShareAppMessage: function () { }
});