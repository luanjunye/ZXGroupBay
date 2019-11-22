const util = require('../../../utils/util');

Page({
  data: {
    refundType:[
      '部分赔付',
      '退货退款'
    ],

    ticketType:[
      '质量问题',
      '其它'
    ],

    product: {
      price: 15.3,
      specs: '6x100g/袋',
      productId: 1536,
      orderId: 7123568476,
      nickName: '飞鱼',
      applyDateTime: '2019-11-21 11:23:12',
      buyCount: 6,
      applyCount: 1,
      name: '紫米面包6袋，110g/袋',
      picUrl: '/assets/list1.jpg',
      buyer: '飞鱼',
      description: ''

    },
    evidenceUrls: []
  },

  onLoad: function (options) {
    let ticketNo = options.ticketno; // 获取工单id
    // TODO：获取工单详情网络数据

  },


  // radio 选项修改

  radioChanged(e){
    console.log(e.detail);
    let name = e.currentTarget.dataset.model;
    let value = Number(e.detail.value);
    this.setData({
      [`product.${name}`]: value
    })
  },


  // counter + -
  decreaseCount(){
    if (this.data.product.applyCount > 1){
      this.setData({
        [`product.applyCount`]: this.data.product.applyCount - 1
      })
    }
  },

  increaseCount(){
    if (this.data.product.applyCount < this.data.product.buyCount){
      this.setData({
        [`product.applyCount`]: this.data.product.applyCount + 1
      })
    }
  },

  // 描述变化时
  descriptionChange(e){
    console.log(e);
    this.setData({
      [`product.description`]: e.detail.value
    })
  },



  // 预览图片
  showCurrentPic(e) {
    let index = e.currentTarget.dataset.index;
    let that = this;
    if (that.data.detailData.evidences.length < 1) {
      return
    } else {
      wx.previewImage({
        urls: [that.data.detailData.evidences[index]],
      })
    }
  },

  // 提交验证
  onSubmit(){
    if(typeof(this.data.product.refundType) !== 'number' ){
      util.toast('请选择处理方式')
    } else if(typeof(this.data.product.ticketType) !== 'number' ){
      util.toast('请选择工单类型')
    } else {
      // TODO: 执行提交操作
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
        console.log(oldPicCount, newPicCount);

        if (oldPicCount + newPicCount > maxCountPics) {
          hasReachMaxCountOfUploadPic = true
          res.tempFilePaths.splice(maxCountPics - oldPicCount, oldPicCount + newPicCount - maxCountPics); // 去掉第二次选择多于5张的图片
        }

        console.log(hasReachMaxCountOfUploadPic)

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
              console.log("======上传成功图片地址为：", result);
              wx.hideLoading();
              console.log(index);

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