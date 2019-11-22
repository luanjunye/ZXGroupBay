// pages/regimentalCommander/changeCommander/changeCommander.js
const chooseLocation = requirePlugin('chooseLocation');
Page({

    /**
     * 页面的初始数据
     */
    data: {

      addressInfo:{
        avater:"/assets/avater.png",
        address: "泽轩优选-高新区康虹路766号盛世花城"
      },

        commanderList: [
            {
                tdefault: true,
                id: 1,
                avater: "/assets/avater.png",
                name: "charon",
                address: "泽轩优选-高新区康虹路766号盛世花城",
                distance: "0.17km"
            },
            {
                tdefault: false,
                id: 2,
                avater: "/assets/avater.png",
                name: "charon",
                address: "泽轩优选-高新区康虹路766号盛世花城",
                distance: "0.17km"
            },
            {
                tdefault: false,
                id: 3,
                avater: "/assets/avater.png",
                name: "charon",
                address: "泽轩优选-高新区康虹路766号盛世花城",
                distance: "0.17km"
            },
            {
                tdefault: false,
                id: 4,
                avater: "/assets/avater.png",
                name: "charon",
                address: "泽轩优选-高新区康虹路766号盛世花城",
                distance: "0.17km"
            }
        ],
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
      const location = chooseLocation.getLocation(); // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
      var that = this

      if (location){
        var address = location.address + location.name
        console.log(location)
        that.setData({
         ["addressInfo.address"]: address
        })

      }
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

  changeAddress:function () {
    const key = 'HYZBZ-EX3CJ-CR2F6-KZDG3-AX3C2-CKFDF'; //使用在腾讯位置服务申请的key
    const referer = '泽轩优选'; //调用插件的app的名称

    wx.navigateTo({
      url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer
    });
  }
})