const util = require('../../utils/util');

Page({
  data: {
    baseUrl: 'http://www.zexuangroup.com',
    videos: [
      {
        id: 5,
        url: '/videos/人参玛咖鸽子汤.mp4',
        poster: '/videos/poster/人参玛咖鸽子汤.jpg',
        title: '人参玛咖鸽子汤',
        description: '',
        subVideos: []
      },
      {
        id: 6,
        url: '/videos/冬瓜虾汤.mp4',
        poster: '/videos/poster/冬瓜虾汤.jpg',
        title: '冬瓜虾汤',
        description: '',
        subVideos: []
      },
      {
        id: 7,
        url: '/videos/响螺肉山药排骨汤.mp4',
        poster: '/videos/poster/响螺肉山药排骨汤.jpg',
        title: '响螺肉山药排骨汤',
        description: '',
        subVideos: []
      },
      {
        id: 8,
        url: '/videos/响螺肉山药排骨汤P2.mp4',
        poster: '/videos/poster/响螺肉山药排骨汤P2.jpg',
        title: '响螺肉山药排骨汤P2',
        description: '',
        subVideos: []
      },
      {
        id: 9,
        url: '/videos/姬松茸菌菇鸡汤.mp4',
        poster: '/videos/poster/姬松茸菌菇鸡汤.jpg',
        title: '姬松茸菌菇鸡汤',
        description: '',
        subVideos: []
      },
      {
        id: 10,
        url: '/videos/山楂莲子汤.mp4',
        poster: '/videos/poster/山楂莲子汤.jpg',
        title: '山楂莲子汤',
        description: '',
        subVideos: []
      },
      {
        id: 11,
        url: '/videos/桂圆红枣银耳汤.mp4',
        poster: '/videos/poster/桂圆红枣银耳汤.jpg',
        title: '桂圆红枣银耳汤',
        description: '',
        subVideos: []
      },
      /*    {
            id: 12,
            url: '/videos/桂圆红枣银耳汤P4.mp4',
            poster: '/videos/poster/桂圆红枣银耳汤P4.jpg',
            title: '桂圆红枣银耳汤P4',
            description: '',
            subVideos: []
          },*/
      {
        id: 13,
        url: '/videos/番茄菌菇汤.mp4',
        poster: '/videos/poster/番茄菌菇汤.jpg',
        title: '番茄菌菇汤',
        description: '',
        subVideos: []
      },
      {
        id: 14,
        url: '/videos/羊肚菌花菇乌鸡汤.mp4',
        poster: '/videos/poster/羊肚菌花菇乌鸡汤.jpg',
        title: '羊肚菌花菇乌鸡汤',
        description: '',
        subVideos: []
      },
      /*    {
            id: 15,
            url: '/videos/羊肚菌花菇乌鸡汤P3.mp4',
            poster: '/videos/poster/羊肚菌花菇乌鸡汤P3.jpg',
            title: '羊肚菌花菇乌鸡汤P3',
            description: '',
            subVideos: []
          },*/
      {
        id: 16,
        url: '/videos/蛹虫草核桃排骨汤.mp4',
        poster: '/videos/poster/蛹虫草核桃排骨汤.jpg',
        title: '蛹虫草核桃排骨汤',
        description: '',
        subVideos: []
      },
      {
        id: 17,
        url: '/videos/排骨莲藕汤.mp4',
        poster: '/videos/poster/排骨莲藕汤.jpg',
        title: '排骨莲藕汤',
        description: '',
        subVideos: []
      },
      {
        id: 18,
        url: '/videos/滋补冬瓜老鸭汤.mp4',
        poster: '/videos/poster/滋补冬瓜老鸭汤.jpg',
        title: '滋补冬瓜老鸭汤',
        description: '',
        subVideos: []
      },
      {
        id: 19,
        url: '/videos/紫薯银耳汤.mp4',
        poster: '/videos/poster/紫薯银耳汤.jpg',
        title: '紫薯银耳汤',
        description: '',
        subVideos: []
      },
      {
        id: 20,
        url: '/videos/办公室唱歌.mp4',
        poster: '/videos/poster/办公室唱歌.jpg',
        title: '办公室唱歌',
        description: '',
        subVideos: []
      },
      {
        id: 21,
        url: '/videos/猜剧中角色名字.mp4',
        poster: '/videos/poster/猜剧中角色名字.jpg',
        title: '猜剧中角色名字',
        description: '',
        subVideos: []
      },
      {
        id: 22,
        url: '/videos/办公室游戏猜片名1.mp4',
        poster: '/videos/poster/办公室游戏猜片名1.jpg',
        title: '办公室游戏猜片名1',
        description: '',
        subVideos: []
      },
      {
        id: 23,
        url: '/videos/看图猜明星1.mp4',
        poster: '/videos/poster/看图猜明星1.jpg',
        title: '看图猜明星1',
        description: '',
        subVideos: []
      },
      {
        id: 24,
        url: '/videos/办公室游戏猜片名2.mp4',
        poster: '/videos/poster/办公室游戏猜片名2.jpg',
        title: '办公室游戏猜片名2',
        description: '',
        subVideos: []
      },
      {
        id: 25,
        url: '/videos/看图猜明星2.mp4',
        poster: '/videos/poster/看图猜明星2.jpg',
        title: '看图猜明星2',
        description: '',
        subVideos: []
      },
    ],
    videoUrl: 'http://www.zexuangroup.com/videos/%E5%8A%9E%E5%85%AC%E5%AE%A4%E6%B8%B8%E6%88%8F%E7%8C%9C%E7%89%87%E5%90%8D2.mp4',
    videoContext: {}
  },

  onLoad: function (options) {
    this.setData({
      videoContext: wx.createVideoContext('video')// 根据 video 标签的 id 获取 video context
    })
  },

  onPause(){
    this.data.videoContext.pause()

  },
  onStop(){
    this.data.videoContext.stop()
  },
  onPlay(){
    this.data.videoContext.play()
  },

  changeVideoSource(e){
    let index = e.currentTarget.dataset.index;
    this.setData({
      videoUrl: this.data.baseUrl + this.data.videos[index].url
    })
  },

// ========================
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },

  onReady: function () { },
  onShow: function () { },

  // onHide: function () { },
  // onUnload: function () { },
  // onReachBottom: function () { },
  // onShareAppMessage: function () { }
});