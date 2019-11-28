// pages/userCenter/groupOrder/groupOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    option1: [
      { text: '手机', value: 0 },
      { text: '昵称', value: 1 },
      { text: '姓名', value: 2 }
    ],
    value1:0,
    status:1,
    group_list:[
      {
        id:1,
        avatar:"/assets/avater.png",
        nickName:"王小鱼儿",
        name:"王小鱼",
        mobile:"13333333333",
        orderList:[
          {
            id:1,
            url:"/assets/list1.jpg",
            title:"紫米面包6袋，110g/袋",
            description:"6袋",
            number:"1",
            time:"2019-11-16"
          },
          {
            id:2,
            url:"/assets/list1.jpg",
            title:"紫米面包6袋，110g/袋",
            description:"6袋",
            number:"1",
            time:"2019-11-16"
          },
          {
            id:3,
            url:"/assets/list1.jpg",
            title:"紫米面包6袋，110g/袋",
            description:"6袋",
            number:"1",
            time:"2019-11-16"
          }
        ],
        orderTime:"2019-11-14 12:11:52",
        orderNumber:"30227805265255512"
      },
      {
        id:2,
        avatar:"/assets/avater.png",
        nickName:"王小鱼儿",
        name:"王小鱼",
        mobile:"13333333333",
        orderList:[
          {
            id:1,
            url:"/assets/list1.jpg",
            title:"紫米面包6袋，110g/袋",
            description:"6袋",
            number:"1",
            time:"2019-11-16"
          },
          {
            id:2,
            url:"/assets/list1.jpg",
            title:"紫米面包6袋，110g/袋",
            description:"6袋",
            number:"1",
            time:"2019-11-16"
          },
          {
            id:3,
            url:"/assets/list1.jpg",
            title:"紫米面包6袋，110g/袋",
            description:"6袋",
            number:"1",
            time:"2019-11-16"
          }
        ],
        orderTime:"2019-11-14 12:11:52",
        orderNumber:"30227805265255512"
      }
    ]
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