var api = require('../config/url.js');


const REGEX = {
    mobile: /^\d{11}$/i
}

// TOAST
function toast(msg) {
    wx.showToast({
        icon: 'none',
        title: msg
    })
}

function toastSuccess(msg) {
    wx.showToast({
        title: msg
    })
}


function trim(value) {
    //去空格
    return value.replace(/(^\s*)|(\s*$)/g, "");
}

function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}


/**
 * 封封微信的的request
 * showLoading: true | false 请求数据时是否显示'正在加载中'的提示
 */
function request(url, data = {}, method, hideLoading, header = "application/json") {
    if (!hideLoading) {
        wx.showLoading({
            title: '加载中...',
        });
    }
    return new Promise(function (resolve, reject) {
        wx.request({
            url: url,
            data: data,
            method: method,
            header: {
                'Content-Type': header,
                'X-Nideshop-Token': wx.getStorageSync('token')
            },
            success: function (res) {
                wx.stopPullDownRefresh();
                if (!hideLoading) {
                    wx.hideLoading();
                }
                // console.log(res);
                if (res.statusCode === 200) {
                    if (res.data.errno === 401) {
                        wx.navigateTo({
                            url: '/pages/auth/btnAuth/btnAuth',
                        })
                    } else {
                        switch (res.data.code) {
                            case 0:
                                resolve(res.data.data);
                                break;
                            /*case 300: // 去掉未登录时自动跳转
                                wx.navigateTo({
                                    url: '/pages/login/login'
                                });
                                break;*/
                            default:
                                /*// TODO: 测试，显示服务器请求出错提示
                                wx.showModal({
                                    title: `请求出错: ${res.data.code}`,
                                    content: url
                                })*/
                                console.log(`错误：${res.data.code} 错误提示： ${res.data.msg} URL: ${url}`)
                        }
                    }
                } else {
                    reject(res.errMsg);
                }

            },
            fail: function (err) {
                reject(err)
            }
        })
    });
}

/**
 * 检查微信会话是否过期
 */
function checkSession() {
    return new Promise(function (resolve, reject) {
        wx.checkSession({
            success: function () {
                resolve(true);
            },
            fail: function () {
                reject(false);
            }
        })
    });
}

/**
 * 调用微信登录
 */
function login() {
    return new Promise(function (resolve, reject) {
        wx.login({
            success: function (res) {
                if (res.code) {
                    resolve(res);
                } else {
                    reject(res);
                }
            },
            fail: function (err) {
                reject(err);
            }
        });
    });
}

function redirect(url) {
    //判断页面是否需要登录
    if (false) {
        wx.redirectTo({
            url: '/pages/auth/login/login'
        });
        return false;
    } else {
        wx.redirectTo({
            url: url
        });
    }
}

function showErrorToast(msg) {
    wx.showToast({
        title: msg,
        image: '/static/images/icon_error.png'
    })
}

function showSuccessToast(msg) {
    wx.showToast({
        title: msg,
    })
}

function formateDate(date, formatString) {
    if (!formatString) {
        formatString = 'yyyy-MM-dd hh:mm:ss';
    }
    let o = {
        "M+": date.getMonth() + 1,                      //月份
        "d+": date.getDate(),                           //日
        "h+": date.getHours(),                          //小时
        "m+": date.getMinutes(),                        //分
        "s+": date.getSeconds(),                        //秒
        "q+": Math.floor((date.getMonth() + 3) / 3),    //季度
        "S": date.getMilliseconds()                     //毫秒
    };
    if (/(y+)/.test(formatString)) {
        formatString = formatString.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(formatString)) {
            formatString = formatString.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return formatString;
};

// 获取用户信息
function getUserInfo() {
    return {
        userInfo: wx.getStorageSync('userInfo'),
        userId: wx.getStorageSync('userId'),
        openId: wx.getStorageSync('openId'),
        isLogined: wx.getStorageSync('isLogin'),
        isMaster: wx.getStorageSync('isMaster')
    }
}

// 更新购物车数量
function updateCartCount() {
    if(this.getUserInfo().userId){
        this.request(api.CartList, {
            "userId": this.getUserInfo().userId
        }, 'GET', true).then(res => {
            // wx.setStorageSync('cartCount', res.totalCount);
            if (res.totalCount > 0){
                wx.setTabBarBadge({
                    index: 2, // 购物车图标 index 从左往右，从0开始
                    text: res.totalCount.toString(),
                    success: () => {
                    }
                })
            }else {
                wx.removeTabBarBadge({
                    index: 2
                })
            }
        })
    } else {
        wx.removeTabBarBadge({
            index: 2
        })
    }

}

//获取当前时间戳
function getTimeStamp() {
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    return timestamp
}


module.exports = {
    REGEX,
    formatTime,
    request,
    redirect,
    showErrorToast,
    showSuccessToast,
    checkSession,
    login,
    formateDate,
    toast,
    toastSuccess,
    getUserInfo,
    updateCartCount,
    getTimeStamp,
    trim,
}