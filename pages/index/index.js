//index.js
//获取应用实例
const app = getApp()
//主页面
Page({
    data: {
        banner: [
            {
              id:1,
              url: "/assets/first.jpg"
            },
          {
            id:2,
            url: "/assets/second.jpg"
          }
          // {
          //   id:3,
          //   url: "/assets/third.jpg"
          // }
          ]

    },
    onload() {

    },

    // ========================
    onReady: function () {
    },
    onShow: function () {
    },
    onHide: function () {
    },
    onUnload: function () {
    },
    onPullDownRefresh: function () {
        wx.stopPullDownRefresh()
    },
    onReachBottom: function () {
    },
    onShareAppMessage: function () {
    }
});
