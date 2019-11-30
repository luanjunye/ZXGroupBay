// pages/sort/sort.js
const api = require('../../config/url.js');
const util = require('../../utils/util.js');
const app = getApp();

Page({

  data: {
    // page meta
    windowHeight: Number,

    categories: [
/*      {
        "id": 1,
        "name": "水果",
        "isShow": 1,
        "icn": "https://zexuanshipin.oss-cn-beijing.aliyuncs.com/20191127/1c49b2bda6c34c3d98c6db8ceff7db1f.jpg",
        "isIndex": 1
      }*/
    ],
    goods: [
/*      {
        "id": 32,
        "name": "海南香蕉1",
        "price": 30,
        "originalPrice": 50,
        "pictureUrl": "https://zexuanshipin.oss-cn-beijing.aliyuncs.com/20191127/029968985d7e4086b6b4d8f041625202.jpg",
        "sellCount": 30,
        "leftCount": 60,
        "categoryName": "水果",
        "goodsUnit": "把",
        "placeOfOrigin": "海南",
        "info": "杀神风",
        "url": [
          "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epE3GOg7oUGDFuR7PGN0oIFJicmZzwtuk3Op3NfJiaGV8w3TpR1IAfWNACtGBN77jcPG2AHuAW8jTgw/132",
          "https://wx.qlogo.cn/mmopen/vi_32/AIdAmibzdhn40DjpvD3Tce9ZCbZkO3VLrRFfItR8uquB7PAJDH1yuMCNicJJtsbkVJUuKVmFLZ7v3oVaicDmeJlXw/132",
          "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqfib57cloOFYPV2y8UZn6saf6uACic9oEEhXneiciczPSV5ibuwEkgVE56zQZiaSqR1nkQpP5zob4SbyEQ/132"
        ]
      },*/
    ],
    currentCategoryId: 0,

    // 分页相关
    pageNo: 1,
    perPageCount: 15, // 每次请求的数量条数
    hasMore: true, // 标记是否还有更多
  },

  onLoad: function (options) {
    let that = this;

    util.updateCartCount(); // 刷新购物车数量

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
      categoryId: categoryId,
      isLike: categoryId === 0? 1: 0, // category 为 0 时，是【猜你喜欢】类别
      keyWord: '',
      page: pageNo,
      limit: that.data.perPageCount
    }, 'GET').then(res => {
      let currentGoodsArray = that.data.goods.concat(res.list);
      if (currentGoodsArray.length === res.totalCount){ // 如果当前返回页面跟总页面数相同，说明没有更多内容了
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




// ========================
  onPullDownRefresh: function () {
    this.setData({
      categories: [],
      goods: [],
      currentCategoryId: 0,
      pageNo: 1,
      perPageCount: this.data.perPageCount,
      hasMore: true,
    })
    this.onLoad();
  },
  onReachBottom: function () {
    // util.toast('Has Reached Bottom');
    let currentPageNo = this.data.pageNo + 1;
    if (this.data.hasMore){
      this.getGoodsListOf(this.data.currentCategoryId, currentPageNo);
    }
  },

  onReady: function () { },
  onShow: function () { },

  // onHide: function () { },
  // onUnload: function () { },
  // onShareAppMessage: function () { }
});