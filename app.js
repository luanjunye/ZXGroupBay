//app.js
const api = require('/config/url.js');
const util = require('/utils/util.js');

App({
  onLaunch: function () {
    wx.getSystemInfo({
      success: res => {
        this.globalData.safeTop = res.safeArea.top;
        this.globalData.safeBttom = res.safeArea.bottom;
        this.globalData.safeLeft = res.safeArea.left;
        this.globalData.safeRight = res.safeArea.right;
        this.globalData.screenHeight = res.screenHeight; // 屏幕高度
        this.globalData.screenWidth = res.screenWidth;
        this.globalData.windowHeight = res.windowHeight; // 除去顶部 navbar 和 底部 tabbar 的内容高度
        this.globalData.windowWidth = res.windowWidth;
      },
    })

    // // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })


    /**
     * 版本自动更新
     * @type {wx.UpdateManager}
     */
    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })

/*    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    }) */

    updateManager.onUpdateReady(function () {
      updateManager.applyUpdate() // 检测到更新，直接更新
    })

    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    })
  },
  globalData: {
    safeTop:      Number,
    safeBottom:   Number,
    safeLeft:     Number,
    safeRight:    Number,
    screenHeight: Number,
    screenWidth:  Number,
    windowHeight: Number,
    windowWidth:  Number,

    userInfo: null
  }
})