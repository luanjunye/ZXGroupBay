const util = require('../../../utils/util');

Page({
  data: {
    pageNo: 1,
    countdown: '',
    orderStates: [
      { id:0, title: '全部', active: true},
      { id:1, title: '待付款', active: false},
      { id:2, title: '待收货', active: false},
      { id:3, title: '已完成', active: false},
      { id:4, title: '退款售后', active: false},
    ],
    order: {
      name: '昵称234[团购ID: 124141]',
      date: '2019-11-21 23:34:21',
      state: '待付款',
      timeLeft: 19 , // TODO: 写倒计时
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
    // console.log(options);
    let currentTabId = options.tab; // 传参过来的 id 是 String
    this.switchState(Number(currentTabId));

    this.startCountDown()
  },

  // 开始倒计时
  startCountDown(){
    let countdownHandle = setInterval(()=>{
      let timeLeft = this.data.order.timeLeft;
      if (timeLeft > 0){
        this.setData({
          countdown: this.formatSecond(timeLeft),
          [`order.timeLeft`]: timeLeft - 1
        })
      } else { // 倒计时结束后
        let handle = wx.getStorageSync('countdown');
        console.log(typeof handle);
        clearInterval(handle);
        this.setData({
          countdown: '',
          [`order.state`]: '已取消'
        })
        wx.removeStorage('countdown')
      }
    },1000);
    wx.setStorageSync('countdown', countdownHandle)
  },

// 输入秒数，输出倒计时字符串
  formatSecond(timeLeft){
    let mins = Number((timeLeft / 60).toFixed());
    let hours = mins / 60;
    let seconds = timeLeft % 60;
    return `剩余时间 ${hours.toString().padStart(2,'00')}:${mins.toString().padStart(2,'00')}:${seconds.toString().padStart(2,'00')}`;
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