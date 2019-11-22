//index.js
//获取应用实例
const app = getApp()
//主页面
Page({
    data: {
        banner: [
            {
                id: 1,
                url: "/assets/first.jpg"
            },
            {
                id: 2,
                url: "/assets/second.jpg"
            },
            {
                id: 3,
                url: "/assets/third.jpg"
            }
        ],
        first_i: [
            {
                id: 1,
                url: "/assets/one.png",
                title: "新鲜蔬果"
            },
            {
                id: 2,
                url: "/assets/two.png",
                title: "水产冻品"
            },
            {
                id: 3,
                url: "/assets/three.png",
                title: "肉禽蛋品"
            },
            {
                id: 4,
                url: "/assets/four.png",
                title: "粮油调味"
            }
        ],
        second_i: [
            {
                id: 5,
                url: "/assets/five.png",
                title: "酒水乳品"
            },
            {
                id: 6,
                url: "/assets/six.png",
                title: "休闲食品"
            },
            {
                id: 7,
                url: "/assets/seven.png",
                title: "生活美妆"
            },
            {
                id: 8,
                url: "/assets/eight.png",
                title: "居家百货"
            }
        ],
        order_list: [
            {
                id: 1,
                url: "/assets/list1.jpg",
                title: "紫米面包6袋，110g/袋",
                description: "奶油，紫米，层层相扣",
                place: "中国",
                label: "次日达",
                price: "9.9",
                originalPrice: "16",
                sale: "5112",
                group: "2759",
                remaining: "1395",
                avaterList: []
            },
            {
                id: 2,
                url: "/assets/list1.jpg",
                title: "厄瓜多尔白虾(100/200板冻)1箱，约2.8斤sadsadsadsadasdqwdqwdqwdwqdwqdwqdwqd",
                description: "味道鲜美 营养丰富",
                place: "进口",
                label: "次日达",
                price: "69.9",
                originalPrice: "89.9",
                sale: "5112",
                group: "2759",
                remaining: "1395",
                avaterList: []
            },
            {
                id: 3,
                url: "/assets/list1.jpg",
                title: "紫米面包6袋，110g/袋",
                description: "奶油，紫米，层层相扣",
                place: "中国",
                label: "次日达",
                price: "9.9",
                originalPrice: "16",
                sale: "5112",
                group: "2759",
                remaining: "1395",
                avaterList: []
            },
            {
                id: 4,
                url: "/assets/list1.jpg",
                title: "紫米面包6袋，110g/袋",
                description: "奶油，紫米，层层相扣",
                place: "中国",
                label: "次日达",
                price: "9.9",
                originalPrice: "16",
                sale: "5112",
                group: "2759",
                remaining: "1395",
                avaterList: []
            },
        ],
        down_avater:[
            {
                id:1,
                url:"/assets/avater.png"
            },
            {
                id:2,
                url:"/assets/avater.png"
            },
            {
                id:3,
                url:"/assets/avater.png"
            }
        ],
        targetTime: 12000,
        clearTimer: false,
        loading:false,
        buyerList:[
            {
                id:1,
                text:"Charon与11:30购买了西红柿新鲜番茄水果沙瓤1箱，约5斤"
            },
            {
                id:2,
                text:"Charon与12:30购买了紫米面包6袋，110g/袋"
            },
            {
                id:3,
                text:"Charon与13:30购买了速冻大对虾（100/200板冻）1箱，约2.8斤"
            },
            {
                id:4,
                text:"Charon与14:30购买了西红柿新鲜番茄水果沙瓤1箱，约5斤"
            },
            {
                id:5,
                text:"Charon与15:30购买了速冻大对虾（100/200板冻）1箱，约2.8斤"
            }
        ]
    },
    onload() {
        // this.setData({
        //     targetTime: new Date().getTime() + 6430000
        // });
    },

    countDown(e) {
        wx.showToast("倒计时结束")
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
