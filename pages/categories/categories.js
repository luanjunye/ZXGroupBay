// pages/sort/sort.js
const api = require('../../config/url.js');
const util = require('../../utils/util.js');
const app = getApp();

Page({

  data: {
    // page meta
    windowHeight: Number,

    count: 0,
    cartTabIndex: 2,
    categories: [],
    goods: [
      {
        id: 1,
        pic: '/assets/test/goods-4.jpg',
        // state: 'sellOut',
        state: 'sell',
        name: "鲜冻小河虾",
        type: '中国 1盒 220克',
        priceOrigin: 1945,
        price: 409.9
      },
    ]
  },

  onLoad: function (options) {
    let that = this;

    // 载入类别列表
    util.request(api.Categories, {}, 'GET').then(res => {
      let initMenuItem = {id: 0, name: '猜您喜欢', active: true};
      let tempArray = [initMenuItem];
      res.forEach(item => {
        tempArray.push({
          id: item.id,
          name: item.name,
          active: false
        })
      })
      that.setData({
        categories: tempArray
      })
    })

    // 载入当前类别的商品列表
    util.request(api.GoodsList, {
      "categoryId": 1,
      "isLike": 1,
      "keyWord": "string"
    }, 'GET').then(res => {
      let initMenuItem = {id: 0, name: '猜您喜欢', active: true};
      let tempArray = [initMenuItem];
      res.forEach(item => {
        tempArray.push({
          id: item.id,
          name: item.name,
          active: false
        })
      })
      that.setData({
        categories: tempArray
      })
    })



    // INIT screenHeight
    this.setData({
      windowHeight: app.globalData.windowHeight
    })

  },

  // 切换分类
  switchCategory(e){
    let clickedCategoryId = e.target.dataset.id;
    let tempArray = [];
    this.data.categories.forEach(item => {
      tempArray.push({
        id: item.id,
        name: item.name,
        active: clickedCategoryId === item.id? true : false
      })
    })

    this.setData({
      categories: tempArray,
      [`goods[0].state`]: this.data.goods[0].state === 'sellOut'? 'sell': 'sellOut'
    })
  },


  // 购物车 +1
  increaseIconBadge(){
    let that = this;
    let currentCount = that.data.count + 1;

    wx.setTabBarBadge({
      index: that.data.cartTabIndex,
      text: currentCount.toString(),
      success: () => {
        that.setData({
          count: currentCount
        })
      }
    })
  },

  // 购物车 -1
  decreaseIconBadge(){
    let that = this;
    let currentCount = that.data.count - 1;

    if (currentCount < 1){
      wx.removeTabBarBadge({
        index: that.data.cartTabIndex,
        success: res => {
          that.setData({
            count: 0
          })
        }
      });
    } else {
      wx.setTabBarBadge({
        index: that.data.cartTabIndex,
        text: currentCount.toString(),
        success: () => {
          that.setData({
            count: currentCount
          })
        }
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