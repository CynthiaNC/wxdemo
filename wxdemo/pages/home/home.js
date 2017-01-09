// pages/home/home.js
Page({
  data:{
    name:'cynthia',
    mailNum:1,
    mail:true,
    positionData:'点击选择位置',
    position:false,
    loading:'',
    submitText:'修改',
    img:'https://img3.doubanio.com/icon/ul138228322-3.jpg',
    hidden:true,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(options){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  formSubmit: function(e){
    var that = this;
    that.setData({
      loading:'true',
      submitText:'',
      hidden:false,
    })

    setTimeout(function(){
      that.setData({
        loading:'',
        submitText:'修改',
        hidden:true,
      })
  
      wx.showToast({
        title: '假装修改成功',
        icon: '',
        duration: 3000
      })
    },5000)

  },
  sliderChange: function(e){
    this.setData({
      mailNum:e.detail.value,
    })
  },
  mailSwitchChange:function(e){
    console.log(e)
    this.setData({
      mail:e.detail.value
    })
  },
  bindImg:function(){
    var that = this;
    wx.chooseImage({
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        that.setData({
          img:tempFilePaths[0]
        })

        // wx.uploadFile({
        //   url: 'http://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
        //   filePath: tempFilePaths[0],
        //   name: 'file',
        //   formData:{
        //     'user': 'test'
        //   },
        //   success: function(res){
        //     var data = res.data
        //     //do something
        //   }
        // })
      }
    })
  },
  positionSwitchChange: function(e){
    this.setData({
      position: e.detail.value,
    })
    if(e.detail.value && this.data.positionData === '点击选择位置') {
      this.positionChoose();
    }
  },
  positionChange: function(){
    this.positionChoose();
  },
  positionChoose:function(){
    var that = this;
    wx.chooseLocation({
      success: function(res){
        that.setData({
          positionData:res.name || res.address
        })        
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
})