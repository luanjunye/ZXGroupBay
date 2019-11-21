// pages/shopCart/shopCart.js
Page({
//购物车
  /**
   * 页面的初始数据
   */
  data: {
    userId: 0,
    isLogin: true,
    noChecked: false,
    checkedAll: false,
    isExpressFree: false,
    totalPrice: 0,
    totalCount: 0,
    freightPrice: 0,
    cartList: [
      {
        checked: false,
        count: 1,
        goodsId: 32,
        id: 4,
        maxNum: 999,
        originPrice: 32,
        picUrl: "https://zexuanshipin.oss-cn-beijing.aliyuncs.com/20191108/880981cbaeeb4f7ab674b661e8734546.jpg",
        price: 19.8,
        spec: "1盒装",
        title: "姬松茸菌菇汤",
      }
    ],
    ids: [],
    shipping:0,
    freight:0,
    activity:"满30元送奶茶，满60元减10元"
  },

  onLoad: function (options) {

  },

  // ========================
  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  onReachBottom: function () { },
  onShareAppMessage: function () { }
});