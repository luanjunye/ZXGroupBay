const util = require('../../utils/util');
const app = getApp();

Page({
  data: {
    screenHeight: Number,
    markers: [{
      iconPath: "/resources/others.png",
      id: 0,
      latitude: 36.686134,
      longitude: 117.130354,
      width: 50,
      height: 50
    }],
    controls: [{
      id: 1,
      iconPath: '/resources/location.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },

  onLoad(){
    this.setData({
      screenHeight: app.globalData.screenHeight
    })
    wx.getSetting({
      success: result => {
        console.log(result)
      }
    })

  },

  // 授权小程序权限
  getAuth(){
    wx.authorize({
      scope: 'scope.userLocation'
    })
  },

  // 获取当前位置
  getCurrentLocation(){
    wx.getLocation( {
      success: res => {
        console.log(res);
        util.toast(
          `Long: ${res.longitude},
                Lati: ${res.latitude},
                Accuracy: ${res.accuracy}`)
      }
    })
  },

  // 拖动地图
  regionchange(e) {
    console.log('RegionChange: ', e)
  },

  markertap(e) {
    console.log('MarkerTap: ', e.markerId)
  },

  // 左下点击
  controltap(e) {
    console.log('ControlTap: ', e.controlId)
  }
})