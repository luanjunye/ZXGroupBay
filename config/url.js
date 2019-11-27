 const API_BASE_URL = 'http://192.168.0.176:8086/freeterapi/';
//const API_BASE_URL = 'https://shop.zexuanshipin.com/freeterapi/';


module.exports = {
  //首页
  IndexUrlBanner: API_BASE_URL + 'index/bannerlist', //首页banner图
  Login: API_BASE_URL + 'login/login', //个人中心登陆
  Categories: API_BASE_URL + 'category/categorylist', // 商品分类列表
  GoodsList: API_BASE_URL + 'goods/goodslist',  // 商品列表
};
