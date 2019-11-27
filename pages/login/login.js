// pages/login/login.js
import Dialog from '../../lib/vant-weapp/dialog/dialog';
const api = require('../../config/url.js');
const util = require('../../utils/util.js');
var app = getApp();

Page({
  // 登陆页面
  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    userInfo: []
  },


  onLoad: function(options) {},
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  // onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {},


  toAgreement: function() {
    wx.navigateTo({
      url: '/pages/ucenter/agreement/agreement',
    })
  },

  getUserInfo: function() {
    wx.getUserInfo({
      success: function(res) {
        let userInfo = res.userInfo
        app.globalData.userInfo = res.userInfo;
        wx.setStorageSync('userInfo', res.userInfo);
        //console.log(app.globalData.userInfo)
      }
    })
  },
  wxlogin: function(e) {
    let that = this;
    // 判断是否授权
    wx.getSetting({
      success(res) {
        console.log(res.authSetting['scope.userInfo'])
        if (res.authSetting['scope.userInfo']) {
          // // 获取用户信息
          //that.getUserInfo()
          // // 记录登录状态
          // wx.setStorageSync('isLogin', true);
          // Dialog.alert({
          //   message: '模拟登录成功，此处还需调用微信登录开放接口'
          // }).then(() => {
          //   // 返回上一级

          // });
          wx.login({
            success: res => {

              if (res.code) {
                util.request(api.Login, {
                  code: res.code,
                  userInfo: e.detail
                }, 'POST', 'application/json').then(res => {
                  if (res.code === 0) {
                    console.log(res.map)
                    wx.setStorageSync('userInfo', res.map.userInfo);
                    wx.setStorageSync('userId', res.map.userId);
                    wx.setStorageSync('openId', res.map.openid);
                    wx.setStorageSync('isLogin', true);
                    wx.switchTab({
                      url: '/pages/index/index',
                    })
                  } else {
                    // util.showErrorToast(res.errmsg)
                    wx.showModal({
                      title: '提示',
                      content: res.msg,
                      showCancel: false
                    });
                  }
                });
              }
            }
          })
        }
      }
    })
  }
})