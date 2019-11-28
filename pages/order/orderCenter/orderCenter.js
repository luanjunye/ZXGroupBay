const api = require('../../../config/url.js');
const util = require('../../../utils/util.js');

Page({
  data: {
    countdown: '',
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
        name: "十月",
        avatar: "https://wx.qlogo.cn/mmopen/vi_32/AIdAmibzdhn40DjpvD3Tce9ZCbZkO3VLrRFfItR8uquB7PAJDH1yuMCNicJJtsbkVJUuKVmFLZ7v3oVaicDmeJlXw/132",
        time: "2019-11-28 11:03:18",
        money: 64,
        failPayTime: "2019-11-28 11:08:18",
        num: 1,
        url: [
          "https://zexuanshipin.oss-cn-beijing.aliyuncs.com/20191127/32bb9c799aad45038048c0f4c78672f7.jpg"
        ],
        statusName: "待收货"
      }*/
    ],

    // 分页相关
    pageNo: 1,
    perPageCount: 15, // 每次请求的数量条数
    hasMore: true, // 标记是否还有更多
  },

  onLoad: function (options) {
    this.setData({
      currentStateId: options && options.tab? Number(options.tab): 0 // option 定义时说明参数 tab 有值
    })
    this.switchState(this.data.currentStateId);

    this.startCountDown() // 开始倒计时
  },



  // 开始倒计时
  startCountDown(){
    // 开始倒计时之前，清除之前的 countdown handle
    let handle = wx.getStorageSync('countdown');
    clearInterval(handle);
    wx.removeStorage('countdown')

    let countdownHandle = setInterval(()=>{
      this.data.orders.forEach((item,index) => {
        let countdown = item.countdown;
        if (countdown > 0){
          this.setData({
            [`orders[${index}].countdownString`]: this.formatSecond(countdown),
            [`orders[${index}].countdown`]: countdown - 1
          })
        } else { // 倒计时结束后
          this.setData({
            [`orders[${index}].countdownString`]: item.failPayTime? '已取消': '', // 如果 failPayTime 存在，就设置成取消，不然就说明不存在倒计时
            [`orders[${index}].countdown`]: 0
          })
        }
      })
    },1000);
    wx.setStorageSync('countdown', countdownHandle)
  },

// 输入秒数，输出倒计时字符串 时时:分分:秒秒
  formatSecond(timeLeft){
    let mins = Number((timeLeft / 60).toFixed());
    let hours = (mins / 60).toFixed();
    let seconds = timeLeft % 60;
    return `剩余时间 ${hours.toString().padStart(2,'00')}:${mins.toString().padStart(2,'00')}:${seconds.toString().padStart(2,'00')}`;
    // return `剩余时间 ${mins.toString().padStart(2,'00')}:${seconds.toString().padStart(2,'00')}`;
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
      currentStateId: 0,
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
    util.request(api.OrderList, {
      userId: util.getUserInfo().userId,
      status: currentStateId,
      page: pageNo,
      limit: that.data.perPageCount
    }, 'GET').then(res => {
      let currentOrderList = that.data.orders.concat(res.list);
      let tempOrderArray = [];
      currentOrderList.forEach(item => {
        if(item.failPayTime){
          let timeLeft = this.getTimeDifference(item.failPayTime);
          item.countdown = timeLeft > 0? timeLeft: 0;
        }
        tempOrderArray.push(item)

      })
      if (pageNo === res.totalPage){ // 如果当前返回页面跟总页面数相同，说明没有更多内容了
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

  // 返回两个时间的差：秒
  getTimeDifference(endTimeString) {
    let timeNow = new Date().getTime();
    let endTimeArray = endTimeString.split('');
    endTimeArray.splice(10,1, 'T');
    endTimeString = endTimeArray.join('');
    let timeEnd = new Date(endTimeString).getTime();
    let timeLeft = (timeEnd - timeNow)/1000;
    return  Number(timeLeft.toFixed())
  },



// ========================
  onPullDownRefresh: function () {
    this.setData({
      orders: [],
      currentStateId: 0,
      pageNo: 1,
      perPageCount: this.data.perPageCount,
      hasMore: true,
    })
    this.onLoad();
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
  // onShareAppMessage: function () { }
});