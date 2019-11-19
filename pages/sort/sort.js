// pages/sort/sort.js

const app = getApp();

Page({

  data: {
    // page meta
    windowHeight: Number,

    count: 0,
    cartTabIndex: 2,
    categories: [
      {id: 0, name: '猜您喜欢', active: true},
      {id: 1, name: '家妆精选', active: false},
      {id: 2, name: '爆款生鲜', active: false},
      {id: 3, name: '新鲜蔬果', active: false},
      {id: 4, name: '酒水乳品', active: false},
      {id: 5, name: '时令水果', active: false},
      {id: 6, name: '休闲食品', active: false},
      {id: 7, name: '水产冻品', active: false},
      {id: 8, name: '生活美妆', active: false},
      {id: 9, name: '肉禽蛋品', active: false},
      {id: 10, name: '生活服务', active: false},
      {id: 11, name: '粮油调味', active: false},
      {id: 12, name: '居家百货', active: false},
      {id: 12, name: '居家百货', active: false},
      {id: 12, name: '居家百货', active: false},
      {id: 12, name: '居家百货', active: false},
      {id: 12, name: '居家百货', active: false},
      {id: 12, name: '居家百货', active: false},
    ],
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