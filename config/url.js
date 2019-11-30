 const API_BASE_URL = 'http://192.168.0.176:8086/freeterapi/';
//const API_BASE_URL = 'https://shop.zexuanshipin.com/freeterapi/';


module.exports = {
  
  //首页
  IndexUrlBanner: API_BASE_URL + 'index/indexBanner', //首页banner图
  IndexRoll: API_BASE_URL+ 'index/indexroll', //首页滚动条
  IndexRegimental: API_BASE_URL+ '/index/indexRegimental', //首页团长信息
  TuanPoster: API_BASE_URL + 'index/indexPoste', // 开团海报
  //登陆
  Login: API_BASE_URL + 'login/login', //个人中心登陆
  //更换/选择团长
  UpdateUserPostion: API_BASE_URL + 'user/updateTeamUserId',//修改存在数据库的位置
  SelectUserPostion: API_BASE_URL + 'user/listTeamUser',//查询个人地址及团长列表
  SelectCommander: API_BASE_URL + 'user/getListTeamUser',//修改地址后查询团长列表
  //商品
  Categories: API_BASE_URL + 'category/categorylist', // 商品分类列表
  GoodsList: API_BASE_URL + 'goods/goodslist',  // 商品列表
  // 购物车
  CartAdd: API_BASE_URL + 'cart/add',  // 添加
  CartList: API_BASE_URL + 'cart/list',  // 列表

  // 团员相关
  MemberList: API_BASE_URL + 'teamuser/list',  // 团员列表
  MemberInfo: API_BASE_URL + 'teamuser/myteamuserinfo',  // 团员信息
  MemberOrderList: API_BASE_URL + 'teamuser/myteamuserorderlist',  // 团员订单列表信息


  // 订单相关
  OrderList: API_BASE_URL + 'order/page',  // 订单列表 GET: userId, status

  // 售后反馈
 FeedbackList: API_BASE_URL + 'aftersales/page',  // 反馈列表
 FeedbackInfo: API_BASE_URL + 'aftersales/info',  // 反馈详情
 FeedbackApply: API_BASE_URL + 'aftersales/save/json',  // 反馈提交

  // 佣金相关
  CommissionWithdraw: API_BASE_URL + 'commissions/save/json',  // 佣金提现
  CommissionList: API_BASE_URL + 'commissions/page',  // 佣金列表
  CommissionInfo: API_BASE_URL + 'commissions/info',  // 佣金详情
  CommissionAmount: API_BASE_URL + 'commissions/awaitmoney',  // 获取可提现余额


  // 用户信息
  UserInfo: API_BASE_URL + 'teamuser/userInfo',  // 获取用户信息


 };

