// pages/login/login.js

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
        userInfo: [],
        isRegimental:0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var userInfo = wx.getStorageSync("userInfo")
        if (userInfo) {
            wx.switchTab({
                url: '/pages/index/index'
            })
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

    //用户协议
    toAgreement: function () {
        wx.navigateTo({
            url: '/pages/userCenter/agreement/agreement',
        })
    },

    getUserInfo: function () {
        wx.getUserInfo({
            success: function (res) {
                let userInfo = res.userInfo
                app.globalData.userInfo = res.userInfo;
                wx.setStorageSync('userInfo', res.userInfo);
                //console.log(app.globalData.userInfo)
            }
        })
    },
    wxlogin: function (e) {
        let that = this;
        // 判断是否授权
        wx.getSetting({
            success(res) {
                console.log(res.authSetting['scope.userInfo'])
                if (res.authSetting['scope.userInfo']) {
                    wx.login({
                        success: res => {

                            if (res.code) {
                                util.request(api.Login, {
                                    code: res.code,
                                    userInfo: e.detail
                                }, 'POST', 'application/json').then(res => {
                                    console.log(res)
                                    wx.setStorageSync('userInfo', res.userInfo);
                                    wx.setStorageSync('userId', res.userId);
                                    wx.setStorageSync('openId', res.openid);
                                    wx.setStorageSync('isLogin', true);
                                    wx.setStorageSync('isMaster', Boolean(res.isRegimental));
                                    if (res.isRegimental){
                                        wx.switchTab({
                                            url: '/pages/index/index',
                                        })
                                    }else{
                                        wx.navigateTo({
                                            url: '/pages/regimentalCommander/changeCommander',
                                        })
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