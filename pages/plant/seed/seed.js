// pages/plant/seed/seed.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seedTop:"https://musematerial.oss-cn-zhangjiakou.aliyuncs.com/picture/wxgroup/plant/seed/%E9%80%81%E4%BD%A0%E4%B8%80%E7%AE%B1%E5%85%8D%E8%B4%B9%E6%B0%B4%E6%9E%9C.png",
    buyerList:[
      "Muse刚刚获得4斤蜜柚",
      "Muse刚刚获得12枚百香果",
      "Muse刚刚获得3斤梨",
      "Muse刚刚获得3斤柠檬",
      "Muse刚刚获得3斤冰糖橙",
      "Muse刚刚获得2斤圣女果",
      "Muse刚刚获得5斤西瓜",
      "Muse刚刚获得2斤葡萄",
      "Muse刚刚获得5斤苹果",
      "Muse刚刚获得4斤哈密瓜"
    ],
    seedList:[
      {
        id:1,
        url:"https://musematerial.oss-cn-zhangjiakou.aliyuncs.com/picture/wxgroup/plant/seed/%E6%9F%9A%E5%AD%90.png",
      },
      {
        id:2,
        url:"https://musematerial.oss-cn-zhangjiakou.aliyuncs.com/picture/wxgroup/plant/seed/%E7%99%BE%E9%A6%99%E6%9E%9C.png",
      },
      {
        id:3,
        url:"https://musematerial.oss-cn-zhangjiakou.aliyuncs.com/picture/wxgroup/plant/seed/%E6%A2%A8.png",
      },
      {
        id:4,
        url:"https://musematerial.oss-cn-zhangjiakou.aliyuncs.com/picture/wxgroup/plant/seed/%E6%9F%A0%E6%AA%AC.png",
      },
      {
        id:5,
        url:"https://musematerial.oss-cn-zhangjiakou.aliyuncs.com/picture/wxgroup/plant/seed/%E6%A9%99%E5%AD%90.png",
      },
      {
        id:6,
        url:"https://musematerial.oss-cn-zhangjiakou.aliyuncs.com/picture/wxgroup/plant/seed/%E5%9C%A3%E5%A5%B3%E6%9E%9C.png",
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //去播种
  toSown: function (e) {
    let data = e.currentTarget.dataset.value;
    if (data){
      wx.navigateTo({
        url:'pages/plant/sown/sown?id=' + data.id
      })
    }
  }
})