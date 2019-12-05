const api = require('../../../config/url.js');
const util = require('../../../utils/util.js');
const uploadImage = require('./../../../utils/fileUpload.js');

const maxCountPics = 5;

Page({
  data: {
    product: {
      price: 15.3,
      goodsCount: 6, // 商品数量
      specs: '',
      goodsId: 31,
      orderId: 33,
      orderNum: '',
      number: 1, // 申请数量
      refundType: 0, // 处理方式  1 | 2
      ticketType: 0, // 工单类型  1 | 2
      name: '',
      picUrl: '',
      buyer: '',
      description: ''
    },
    evidenceUrls: []
  },

  onLoad: function (options) {
    let infoFeedback = wx.getStorageSync('infoFeedback');
    this.setData({
      ['product.name']: infoFeedback.product.name,
      ['product.price']: infoFeedback.product.price,
      ['product.goodsCount']: infoFeedback.product.num,
      ['product.specs']: infoFeedback.product.specification? infoFeedback.product.specification: '',
      ['product.picUrl']: infoFeedback.product.url,
      ['product.goodsId']: infoFeedback.product.id,
      ['product.buyer']: infoFeedback.buyer,
      ['product.orderNum']: infoFeedback.orderNum,
    })
  },


  // radio 选项修改

  radioChanged(e){
    // console.log(e.detail);
    let name = e.currentTarget.dataset.model;
    let value = Number(e.detail.value);
    this.setData({
      [`product.${name}`]: value
    })
  },


  // counter + -
  decreaseCount(){
    if (this.data.product.number > 1){
      this.setData({
        [`product.number`]: this.data.product.number - 1
      })
    }
  },

  increaseCount(){
    if (this.data.product.number < this.data.product.goodsCount){
      this.setData({
        [`product.number`]: this.data.product.number + 1
      })
    }
  },

  // 描述变化时
  descriptionChange(e){
    // console.log(e);
    this.setData({
      [`product.description`]: e.detail.value
    })
  },


  // 删除当前图片
  removeCurrentPic(e) {
    let index = e.currentTarget.dataset.index;
    let tmpPicArray = this.data.evidenceUrls;
    tmpPicArray.splice(index, 1);
    this.setData({
      evidenceUrls: tmpPicArray
    })
  },



  // 预览图片
  showCurrentPic(e) {
    let index = e.currentTarget.dataset.index;
    let that = this;
    if (that.data.evidenceUrls.length < 1) {
      return
    } else {
      wx.previewImage({
        urls: [that.data.evidenceUrls[index]],
      })
    }
  },

  // 提交验证
  onSubmit(){
    let that = this;
    if(this.data.product.refundType === 0 ){
      util.toast('请选择处理方式')
    } else if(this.data.product.ticketType === 0 ){
      util.toast('请选择工单类型')
    } else {
      util.request(api.FeedbackApply, {
        goodsId: that.data.product.goodsId,
        orderNum: that.data.product.orderNum,
        info: that.data.product.description,
        number: that.data.product.number,
        state: that.data.product.refundType,
        type: that.data.product.ticketType,
        url: that.data.evidenceUrls,
        userId: util.getUserInfo().userId
      }, 'POST').then(res=>{
        // console.log(res);
        util.toastSuccess('提交成功');
        setTimeout(()=>{
          wx.navigateBack();
        },1500)
      })
    }
  },


  // 图片选择
  imgPickerTaped() {
    let that = this;
    wx.chooseImage({
      count: 5,
      compressed: ['compressed'],
      success: function(res) {
        let hasReachMaxCountOfUploadPic = false; // 是否达到最大上传数量，在上传最后提示用

        // 新旧图片数量
        let oldPicCount = that.data.evidenceUrls.length;
        let newPicCount = res.tempFilePaths.length;
        // console.log(oldPicCount, newPicCount);

        if (oldPicCount + newPicCount > maxCountPics) {
          hasReachMaxCountOfUploadPic = true
          res.tempFilePaths.splice(maxCountPics - oldPicCount, oldPicCount + newPicCount - maxCountPics); // 去掉第二次选择多于5张的图片
        }

        // console.log(hasReachMaxCountOfUploadPic)

        // 路径参数
        let tempFilePaths = that.data.evidenceUrls;
        let nowTime = util.formateDate(new Date(), 'yyyy-MM-dd');
        let evidenceFinalUrls = [];

        res.tempFilePaths.forEach((item, index) => {
          //显示消息提示框
          wx.showLoading({
            title: '上传中' + (index + 1) + '/' + tempFilePaths.length,
            mask: true
          })
          //上传图片
          uploadImage(item, 'images/' + nowTime + '/',
            function(result) {
              let tempLastPicArray = that.data.evidenceUrls;
              tempLastPicArray.push(result);
              that.setData({
                evidenceUrls: tempLastPicArray
              })
              // console.log("======上传成功图片地址为：", result);
              wx.hideLoading();
              // console.log(index);

              // 每次上传完成后，查看是否为最后一张要上传的图，如果是，就显示达到最大上传数量的提示，不能写到结尾，因为异步
              if (hasReachMaxCountOfUploadPic) {
                wx.showToast({
                  icon: 'none',
                  title: `最多上传${maxCountPics}张凭证`,
                });
              }
            },
            function(result) {
              console.log("======上传失败======", result);
              wx.hideLoading()
            }
          )
        })
      }
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