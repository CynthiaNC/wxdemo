// pages/home/home.js
Page({
  data:{
    name:'cynthia',
    mailNum:1,
    mail:true,
    loading:'',
    submitText:'修改'
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
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
      submitText:''
    })
    setTimeout(function(){
      that.setData({
        loading:'',
        submitText:'修改'
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
  switchChange:function(e){
    console.log(e)
    this.setData({
      mail:e.detail.value
    })
  }
})