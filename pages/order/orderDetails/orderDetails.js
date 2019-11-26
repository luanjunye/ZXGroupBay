// pages/order/orderDetails/orderDetails.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

        product: {
            amount: "119.8",
            preferential: "10",
            total: "109.8",
            name: "李嘉琪",
            phone: "13333333333333",
            remark: "",
            number: "30227805265255512",
            // statusCode: 3,
            // statusText: "订单已完成",
            statusCode:1,
            statusText:"待支付",
            time: "300",
            subscribeTime: "2019-11-14 12:11:52",
            EndTime: "2019-11-15 16:11:34",
            orderList: [
                {
                    id: 1,
                    url: "/assets/list1.jpg",
                    title: "紫米面包6袋，110g/袋",
                    description: "6袋",
                    label: "次日达",
                    price: "59.9"
                },
                {
                    id: 2,
                    url: "/assets/list1.jpg",
                    title: "紫米面包6袋，110g/袋",
                    description: "6袋",
                    label: "次日达",
                    price: "59.9"
                }
            ],
        },


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