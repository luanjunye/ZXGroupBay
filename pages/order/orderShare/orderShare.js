// pages/order/orderShare/orderShare.js
const api = require('../../../config/url.js');
const util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:"",
    name:"",
    info:"",
    time:"",
    avatar:"",
    shareOrderGoodsVOS:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
      let orderId = options.orderId
      if(orderId){
        //获取订单分享详情
        util.request(api.OrderShare, {id: orderId}, "POST").then(function (res) {
          that.setData({
            address: res.address,
            name: res.name,
            avatar: res.avatar,
            info: res.info,
            time: res.time,
            shareOrderGoodsVOS: res.shareOrderGoodsVOS,
          });
        });
      }
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

  //去首页
  toIndex:function () {
    wx.switchTab({
      url:'/pages/index/index'
    })
  }
})