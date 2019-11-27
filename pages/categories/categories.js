// pages/sort/sort.js
const api = require('../../config/url.js');
const util = require('../../utils/util.js');
const app = getApp();

Page({

  data: {
    // page meta
    windowHeight: Number,

    categories: [],
    goods: [],
    currentCategoryId: 0,

    pageNo: 1,
    perPageCount: 8,
    hasMore: true, // 标记是否还有更多
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

    this.getGoodsListOf(this.data.currentCategoryId, 1); // 载入【猜你喜欢】类别的商品列表

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
        active: clickedCategoryId === item.id
      })
    })
    this.setData({
      hasMore: true, // 切换类别时初始化为 ture
      goods: [],
      categories: tempArray,
      currentCategoryId: clickedCategoryId
    })
    this.getGoodsListOf(clickedCategoryId, 1);
  },

  // 载入对应类别的商品列表
  getGoodsListOf(categoryId, pageNo){
    let that = this;
    util.request(api.GoodsList, {
      "categoryId": categoryId,
      "isLike": categoryId === 0? 1: 0, // category 为 0 时，是【猜你喜欢】类别
      "keyWord": "",
      "page": pageNo,
      "limit": that.data.perPageCount
    }, 'GET').then(res => {
      wx.stopPullDownRefresh();
      let currentGoodsArray = that.data.goods.concat(res.list);
      if (pageNo === res.totalPage){ // 如果当前返回页面跟总页面数相同，说明没有更多内容了
        that.setData({
          hasMore: false
        })
      }
      that.setData({
        pageNo: pageNo,
        goods: that.data.goods.concat(res.list)
      })
    })
  },

  // 购物车 +1
  increaseIconBadge(e){
    let goodId = e.currentTarget.dataset.id;
    let that = this;
    util.request(api.CartAdd, {
      "goodsId": goodId,
      "userId": util.getUserInfo().userId
    }, 'POST').then(res => {
      util.toastSuccess('成功添加至购物车')
    })

    // 更新购物车
    util.updateCartCount();
  },

/*
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
*/


// ========================
  onPullDownRefresh: function () {
    this.setData({
      categories: [],
      goods: [],
      currentCategoryId: 0,
      pageNo: 1,
      perPageCount: 8,
      hasMore: true,
    })
    this.onLoad();
  },

  onReady: function () { },
  onShow: function () { },

  // onHide: function () { },
  // onUnload: function () { },
  onReachBottom: function () {
    // util.toast('Has Reached Bottom');
    let currentPageNo = this.data.pageNo + 1;
    if (this.data.hasMore){
      this.getGoodsListOf(this.data.currentCategoryId, currentPageNo);
    }
  },
  // onShareAppMessage: function () { }
});