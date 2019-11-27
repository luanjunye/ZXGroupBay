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
    goods: []
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

    this.getGoodsListOf(0); // 载入【猜你喜欢】类别的商品列表

    // INIT screenHeight
    this.setData({
      windowHeight: app.globalData.windowHeight
    })
  },


  // 切换分类
  switchCategory(e){
    let clickedCategoryId = e.target.dataset.id;
    let tempArray = [];
    this.setData({
    })
    this.data.categories.forEach(item => {
      tempArray.push({
        id: item.id,
        name: item.name,
        active: clickedCategoryId === item.id
      })
    })
    this.setData({
      goods: [],
      categories: tempArray,
    })
    this.getGoodsListOf(clickedCategoryId);
  },

  // 载入对应类别的商品列表
  getGoodsListOf(categoryId){
    let that = this;
    util.request(api.GoodsList, {
      "categoryId": categoryId,
      "isLike": categoryId === 0? 1: 0, // category 为 0 时，是【猜你喜欢】类别
      "keyWord": ""
    }, 'GET').then(res => {
      that.setData({
        goods: that.data.goods.concat(res.list)
      })
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