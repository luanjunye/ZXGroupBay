const util = require('../../utils/util');

Page({
  data: {
    rootDir: 'http://www.zexuangroup.com/',
    videos: [
      {id: 101, group: 'food', type: 'portrait', title: '人参玛咖鸽子汤', url: 'videos/人参玛咖鸽子汤.mp4', poster: 'videos/poster/人参玛咖鸽子汤.jpg',  description: '', },
      {id: 102, group: 'food', type: 'portrait', title: '冬瓜虾汤', url: 'videos/冬瓜虾汤.mp4', poster: 'videos/poster/冬瓜虾汤.jpg',  description: '', },
      {id: 103, group: 'food', type: 'portrait', title: '响螺肉山药排骨汤', url: 'videos/响螺肉山药排骨汤.mp4', poster: 'videos/poster/响螺肉山药排骨汤.jpg',  description: '', },
      {id: 104, group: 'food', type: 'portrait', title: '响螺肉山药排骨汤P2', url: 'videos/响螺肉山药排骨汤P2.mp4', poster: 'videos/poster/响螺肉山药排骨汤P2.jpg',  description: '', },
      {id: 105, group: 'food', type: 'portrait', title: '姬松茸菌菇鸡汤', url: 'videos/姬松茸菌菇鸡汤.mp4', poster: 'videos/poster/姬松茸菌菇鸡汤.jpg',  description: '', },
      {id: 106, group: 'food', type: 'portrait', title: '山楂莲子汤', url: 'videos/山楂莲子汤.mp4', poster: 'videos/poster/山楂莲子汤.jpg',  description: '', },
      {id: 107, group: 'food', type: 'portrait', title: '桂圆红枣银耳汤', url: 'videos/桂圆红枣银耳汤.mp4', poster: 'videos/poster/桂圆红枣银耳汤.jpg',  description: '', },
      // {id: 108, group: 'food', type: 'landscape', title: '桂圆红枣银耳汤P4', url: 'videos/桂圆红枣银耳汤P4.mp4', poster: 'videos/poster/桂圆红枣银耳汤P4.jpg',  description: '', },
      {id: 109, group: 'food', type: 'portrait', title: '番茄菌菇汤', url: 'videos/番茄菌菇汤.mp4', poster: 'videos/poster/番茄菌菇汤.jpg',  description: '', },
      {id: 110, group: 'food', type: 'portrait', title: '羊肚菌花菇乌鸡汤', url: 'videos/羊肚菌花菇乌鸡汤.mp4', poster: 'videos/poster/羊肚菌花菇乌鸡汤.jpg',  description: '', },
      // {id: 111, group: 'food', type: 'landscape', title: '羊肚菌花菇乌鸡汤P3', url: 'videos/羊肚菌花菇乌鸡汤P3.mp4', poster: 'videos/poster/羊肚菌花菇乌鸡汤P3.jpg',  description: '', },
      {id: 112, group: 'food', type: 'portrait', title: '蛹虫草核桃排骨汤', url: 'videos/蛹虫草核桃排骨汤.mp4', poster: 'videos/poster/蛹虫草核桃排骨汤.jpg',  description: '', },
      {id: 113, group: 'food', type: 'portrait', title: '排骨莲藕汤', url: 'videos/排骨莲藕汤.mp4', poster: 'videos/poster/排骨莲藕汤.jpg',  description: '', },
      {id: 114, group: 'food', type: 'portrait', title: '滋补冬瓜老鸭汤', url: 'videos/滋补冬瓜老鸭汤.mp4', poster: 'videos/poster/滋补冬瓜老鸭汤.jpg',  description: '', },
      {id: 115, group: 'food', type: 'portrait', title: '紫薯银耳汤', url: 'videos/紫薯银耳汤.mp4', poster: 'videos/poster/紫薯银耳汤.jpg',  description: '', },
      {id: 116, group: 'food', type: 'portrait', title: '无花果黑豆汤', url: 'videos/无花果黑豆汤.mp4', poster: 'videos/poster/无花果黑豆汤.jpg',  description: '', },
      {id: 117, group: 'food', type: 'portrait', title: '猪手花生补气汤', url: 'videos/猪手花生补气汤.mp4', poster: 'videos/poster/猪手花生补气汤.jpg',  description: '', },

      {id: 202, group: 'office', type: 'portrait', title: '办公室唱歌', url: 'videos/办公室唱歌.mp4', poster: 'videos/poster/办公室唱歌.jpg',  description: '', },
      {id: 203, group: 'office', type: 'portrait', title: '猜剧中角色名字', url: 'videos/猜剧中角色名字.mp4', poster: 'videos/poster/猜剧中角色名字.jpg',  description: '', },
      {id: 204, group: 'office', type: 'portrait', title: '奇怪的词组成句子', url: 'videos/奇怪的词组成句子.mp4', poster: 'videos/poster/奇怪的词组成句子.jpg',  description: '', },
      {id: 205, group: 'office', type: 'portrait', title: '猜动漫1', url: 'videos/猜动漫1.mp4', poster: 'videos/poster/猜动漫1.jpg',  description: '', },
      {id: 206, group: 'office', type: 'portrait', title: '猜西游记1', url: 'videos/猜西游记1.mp4', poster: 'videos/poster/猜西游记1.jpg',  description: '', },
      {id: 207, group: 'office', type: 'portrait', title: '猜西游记2', url: 'videos/猜西游记2.mp4', poster: 'videos/poster/猜西游记2.jpg',  description: '', },
      {id: 208, group: 'office', type: 'portrait', title: '办公室游戏猜片名1', url: 'videos/办公室游戏猜片名1.mp4', poster: 'videos/poster/办公室游戏猜片名1.jpg',  description: '', },
      {id: 209, group: 'office', type: 'portrait', title: '办公室游戏猜片名2', url: 'videos/办公室游戏猜片名2.mp4', poster: 'videos/poster/办公室游戏猜片名2.jpg',  description: '', },
      {id: 210, group: 'office', type: 'portrait', title: '看图猜明星1', url: 'videos/看图猜明星1.mp4', poster: 'videos/poster/看图猜明星1.jpg',  description: '', },
      {id: 211, group: 'office', type: 'portrait', title: '看图猜明星2', url: 'videos/看图猜明星2.mp4', poster: 'videos/poster/看图猜明星2.jpg',  description: '', },

      {id: 301, group: 'msSoup', type: 'portrait', title: '汤婆婆-换性格', url: 'videos/汤婆婆-换性格.mp4', poster: 'videos/poster/汤婆婆-换性格.jpg',  description: '', },
      {id: 302, group: 'msSoup', type: 'portrait', title: '汤婆婆-第二期', url: 'videos/汤婆婆-第二期.mp4', poster: 'videos/poster/汤婆婆-第二期.jpg',  description: '', },
      {id: 303, group: 'msSoup', type: 'portrait', title: '汤婆婆分手篇', url: 'videos/汤婆婆分手篇.mp4', poster: 'videos/poster/汤婆婆分手篇.jpg',  description: '', },
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
      videoUrl: this.data.rootDir + this.data.videos[index].url
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