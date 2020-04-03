const util = require('../../utils/util');

Page({
    data: {
        animationData: "",
        waterAnimationData: "",
        isWater: false
    },

    onLoad: function (options) {

    },

    // //点击提壶
    // toSpin: function () {
    //     let that = this
    //     this.animation.translate(0, -100).step().rotate(-45).step().opacity(0).step()
    //
    //     this.setData({
    //         animationData: this.animation.export()
    //     })
    //     setTimeout(function () {
    //         that.displayWater()
    //     },1300)
    //     setTimeout(function () {
    //         that.roback()
    //     }, 2200);
    // },
    //
    // //展示水
    // displayWater:function(){
    //     this.water.opacity(1).step()
    //     this.setData({
    //         isWater:true,
    //         waterAnimationData: this.water.export()
    //     })
    // },
    //
    // //还原
    // roback: function () {
    //     let that = this
    //     this.animation.translate(0, 0).rotate(0).scale(1).skewX(0).opacity(0).step().opacity(1).step()
    //     this.water.opacity(0).step()
    //     this.setData({
    //         animationData: this.animation.export(),
    //         waterAnimationData: this.water.export(),
    //         isWater:false
    //     })
    // },

// ========================
    onPullDownRefresh: function () {
        wx.stopPullDownRefresh()
    },

    onReady: function () {
        this.animation = wx.createAnimation({
            duration: 1000
        })
        this.water = wx.createAnimation()
    },
    onShow: function () {
    },

    // onHide: function () { },
    // onUnload: function () { },
    // onReachBottom: function () { },
    // onShareAppMessage: function () { }
});