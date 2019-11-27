 const API_BASE_URL = 'http://192.168.0.176:8086/freeterapi/';
//const API_BASE_URL = 'https://shop.zexuanshipin.com/freeterapi/';


module.exports = {
  
  //首页
  IndexUrlBanner: API_BASE_URL + 'index/bannerlist', //首页banner图
  //登陆
  Login: API_BASE_URL + 'login/login', //个人中心登陆
  //更换/选择团长
  UpdateUserPostion: API_BASE_URL + 'user/updateTeamUserId',//修改存在数据库的位置
  SelectUserPostion: API_BASE_URL + 'user/listTeamUser',//查询个人地址及团长列表
  SelectCommander: API_BASE_URL + 'user/getListTeamUser',//修改地址后查询团长列表
};