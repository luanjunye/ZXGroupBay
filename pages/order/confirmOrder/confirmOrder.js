// pages/order/confirmOrder/confirmOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList:[
      {
        id:1,
        url:"/assets/list1.jpg",
        title:"紫米面包6袋，110g/袋",
        description:"6袋",
        label:"次日达",
        price:"59.9"
      },
      {
        id:2,
        url:"/assets/list1.jpg",
        title:"紫米面包6袋，110g/袋",
        description:"6袋",
        label:"次日达",
        price:"59.9"
      }
    ],
    amount:"119.8",
    preferential:"10",
    total:"109.8"
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

  }
})