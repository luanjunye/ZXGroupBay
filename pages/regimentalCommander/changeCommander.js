// pages/regimentalCommander/changeCommander/changeCommander.js
const chooseLocation = requirePlugin('chooseLocation');
const api = require('../../config/url.js');
const util = require('../../utils/util.js');
const key = 'HYZBZ-EX3CJ-CR2F6-KZDG3-AX3C2-CKFDF'; //使用在腾讯位置服务申请的key
const referer = '泽轩优选'; //调用插件的app的名称
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        avatar: "",
        address: "",
        teamUsers: [],
        location: "",
        userId: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        var userInfo = wx.getStorageSync("userInfo");
        let userId = wx.getStorageSync("userId");
        var data = new Object();
        if (userInfo && userId)
            that.setData({
                avatar: userInfo.avatarUrl,
                userId: userId
            })

        if (userId) {
            util.request(api.SelectUserPostion, {
                userId: userId
            }, "GET").then(function (res) {
                data.teamUsers = res.teamUsers
                data.address = res.address
                console.log(data.address)
                if (!data.address) {
                    wx.navigateTo({
                        url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer
                    });
                }
                that.setData(data);
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
        const location = chooseLocation.getLocation(); // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
        console.log(location)
        let that = this;
        var data = new Object();
        if (location) {
            var land = location.name
            that.setData({
                address: land,
                location: location
            })
            util.request(api.SelectCommander, {
                address: location.address,
                city: location.city,
                latitude: location.latitude,
                longitude: location.longitude,
                name: location.name
            }, "GET").then(function (res) {
                data.teamUsers = res.teamUsers
                console.log(data.teamUsers)
                that.setData(data);
            });
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

    changeAddress: function () {
        wx.navigateTo({
            url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer
        });
    },

    checkAndToBuy: function (e) {
        let id = e.currentTarget.dataset.id;

        if (id) {
            util.request(api.UpdateUserPostion, {
                name: this.data.location.name,
                latitude: this.data.location.latitude,
                longitude: this.data.location.longitude,
                address: this.data.location.address,
                city: this.data.location.city,
                userId: this.data.userId,
                teamUserId: id,
            }, "POST").then(function (res) {
                wx.switchTab({
                    url: '/pages/index/index'
                })
            });
        }

    }
})