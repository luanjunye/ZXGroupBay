const util = require('../../utils/util');
const rootDir = 'http://www.zexuangroup.com/';


Page({
  data: {
    videos: [
      {id: 101, group: 'food', type: 'portrait', title: '人参玛咖鸽子汤', url: rootDir + 'videos/food/人参玛咖鸽子汤.mp4', poster: rootDir + 'videos/food/人参玛咖鸽子汤.jpg',  description: '', },
      {id: 102, group: 'food', type: 'portrait', title: '冬瓜虾汤', url: rootDir + 'videos/food/冬瓜虾汤.mp4', poster: rootDir + 'videos/food/冬瓜虾汤.jpg',  description: '', },
      {id: 103, group: 'food', type: 'portrait', title: '响螺肉山药排骨汤', url: rootDir + 'videos/food/响螺肉山药排骨汤.mp4', poster: rootDir + 'videos/food/响螺肉山药排骨汤.jpg',  description: '', },
      {id: 104, group: 'food', type: 'portrait', title: '响螺肉山药排骨汤P2', url: rootDir + 'videos/food/响螺肉山药排骨汤P2.mp4', poster: rootDir + 'videos/food/响螺肉山药排骨汤P2.jpg',  description: '', },
      {id: 105, group: 'food', type: 'portrait', title: '姬松茸菌菇鸡汤', url: rootDir + 'videos/food/姬松茸菌菇鸡汤.mp4', poster: rootDir + 'videos/food/姬松茸菌菇鸡汤.jpg',  description: '', },
      {id: 106, group: 'food', type: 'portrait', title: '山楂莲子汤', url: rootDir + 'videos/food/山楂莲子汤.mp4', poster: rootDir + 'videos/food/山楂莲子汤.jpg',  description: '', },
      {id: 107, group: 'food', type: 'portrait', title: '桂圆红枣银耳汤', url: rootDir + 'videos/food/桂圆红枣银耳汤.mp4', poster: rootDir + 'videos/food/桂圆红枣银耳汤.jpg',  description: '', },
      // {id: 108, group: 'food', type: 'landscape', title: '桂圆红枣银耳汤P4', url: rootDir + 'videos/food/桂圆红枣银耳汤P4.mp4', poster: rootDir + 'videos/food/桂圆红枣银耳汤P4.jpg',  description: '', },
      {id: 109, group: 'food', type: 'portrait', title: '番茄菌菇汤', url: rootDir + 'videos/food/番茄菌菇汤.mp4', poster: rootDir + 'videos/food/番茄菌菇汤.jpg',  description: '', },
      {id: 110, group: 'food', type: 'portrait', title: '羊肚菌花菇乌鸡汤', url: rootDir + 'videos/food/羊肚菌花菇乌鸡汤.mp4', poster: rootDir + 'videos/food/羊肚菌花菇乌鸡汤.jpg',  description: '', },
      // {id: 111, group: 'food', type: 'landscape', title: '羊肚菌花菇乌鸡汤P3', url: rootDir + 'videos/food/羊肚菌花菇乌鸡汤P3.mp4', poster: rootDir + 'videos/food/羊肚菌花菇乌鸡汤P3.jpg',  description: '', },
      {id: 112, group: 'food', type: 'portrait', title: '蛹虫草核桃排骨汤', url: rootDir + 'videos/food/蛹虫草核桃排骨汤.mp4', poster: rootDir + 'videos/food/蛹虫草核桃排骨汤.jpg',  description: '', },
      {id: 113, group: 'food', type: 'portrait', title: '排骨莲藕汤', url: rootDir + 'videos/food/排骨莲藕汤.mp4', poster: rootDir + 'videos/food/排骨莲藕汤.jpg',  description: '', },
      {id: 114, group: 'food', type: 'portrait', title: '滋补冬瓜老鸭汤', url: rootDir + 'videos/food/滋补冬瓜老鸭汤.mp4', poster: rootDir + 'videos/food/滋补冬瓜老鸭汤.jpg',  description: '', },
      {id: 115, group: 'food', type: 'portrait', title: '紫薯银耳汤', url: rootDir + 'videos/food/紫薯银耳汤.mp4', poster: rootDir + 'videos/food/紫薯银耳汤.jpg',  description: '', },
      {id: 116, group: 'food', type: 'portrait', title: '无花果黑豆汤', url: rootDir + 'videos/food/无花果黑豆汤.mp4', poster: rootDir + 'videos/food/无花果黑豆汤.jpg',  description: '', },
      {id: 117, group: 'food', type: 'portrait', title: '猪手花生补气汤', url: rootDir + 'videos/food/猪手花生补气汤.mp4', poster: rootDir + 'videos/food/猪手花生补气汤.jpg',  description: '', },
      {id: 118, group: 'food', type: 'portrait', title: '菌菇鸡汤煲', url: rootDir + 'videos/food/菌菇鸡汤煲.mp4', poster: rootDir + 'videos/food/菌菇鸡汤煲.jpg',  description: '', },
      {id: 119, group: 'food', type: 'portrait', title: '什锦猪手汤', url: rootDir + 'videos/food/什锦猪手汤.mp4', poster: rootDir + 'videos/food/什锦猪手汤.jpg',  description: '', },

      {id: 202, group: 'office', type: 'portrait', title: '怪词组句', url: rootDir + 'videos/office/怪词组句.mp4', poster: rootDir + 'videos/office/怪词组句.jpg',  description: '', },
      {id: 203, group: 'office', type: 'portrait', title: '猜《西游记》', url: rootDir + 'videos/office/猜《西游记》.mp4', poster: rootDir + 'videos/office/猜《西游记》.jpg',  description: '', },
      {id: 204, group: 'office', type: 'portrait', title: '猜剧中角色名字', url: rootDir + 'videos/office/猜剧中角色名字.mp4', poster: rootDir + 'videos/office/猜剧中角色名字.jpg',  description: '', },
      {id: 205, group: 'office', type: 'portrait', title: '猜动漫01', url: rootDir + 'videos/office/猜动漫01.mp4', poster: rootDir + 'videos/office/猜动漫01.jpg',  description: '', },
      {id: 206, group: 'office', type: 'portrait', title: '猜动漫02', url: rootDir + 'videos/office/猜动漫02.mp4', poster: rootDir + 'videos/office/猜动漫02.jpg',  description: '', },
      {id: 207, group: 'office', type: 'portrait', title: '猜动漫03', url: rootDir + 'videos/office/猜动漫03.mp4', poster: rootDir + 'videos/office/猜动漫03.jpg',  description: '', },
      {id: 208, group: 'office', type: 'portrait', title: '猜动漫04', url: rootDir + 'videos/office/猜动漫04.mp4', poster: rootDir + 'videos/office/猜动漫04.jpg',  description: '', },
      {id: 209, group: 'office', type: 'portrait', title: '猜动漫05', url: rootDir + 'videos/office/猜动漫05.mp4', poster: rootDir + 'videos/office/猜动漫05.jpg',  description: '', },
      {id: 210, group: 'office', type: 'portrait', title: '猜动漫06', url: rootDir + 'videos/office/猜动漫06.mp4', poster: rootDir + 'videos/office/猜动漫06.jpg',  description: '', },
      {id: 211, group: 'office', type: 'portrait', title: '看图猜明星01', url: rootDir + 'videos/office/看图猜明星01.mp4', poster: rootDir + 'videos/office/看图猜明星01.jpg',  description: '', },
      {id: 211, group: 'office', type: 'portrait', title: '看图猜明星02', url: rootDir + 'videos/office/看图猜明星02.mp4', poster: rootDir + 'videos/office/看图猜明星02.jpg',  description: '', },

      {id: 301, group: 'msSoup', type: 'portrait', title: '汤婆婆-换性格', url: rootDir + 'videos/mssoup/汤婆婆-换性格.mp4', poster: rootDir + 'videos/mssoup/汤婆婆-换性格.jpg',  description: '', },
      {id: 302, group: 'msSoup', type: 'portrait', title: '汤婆婆-第二期', url: rootDir + 'videos/mssoup/汤婆婆-第二期.mp4', poster: rootDir + 'videos/mssoup/汤婆婆-第二期.jpg',  description: '', },
      {id: 303, group: 'msSoup', type: 'portrait', title: '汤婆婆分手篇', url: rootDir + 'videos/mssoup/汤婆婆分手篇.mp4', poster: rootDir + 'videos/mssoup/汤婆婆分手篇.jpg',  description: '', },
      {id: 303, group: 'msSoup', type: 'portrait', title: '汤婆婆兄弟篇', url: rootDir + 'videos/mssoup/汤婆婆兄弟篇.mp4', poster: rootDir + 'videos/mssoup/汤婆婆兄弟篇.jpg',  description: '', },
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