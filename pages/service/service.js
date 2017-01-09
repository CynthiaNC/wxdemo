// pages/service/service.js
Page({
  data:{
    service:[
      {name:'拨打电话',event:'bindCall'},
      {name:'扫码',event:'bindScan'},
      {name:'录音',event:'bindRecord'},
      {name:'查看当前网络类型',event:'bindGetNetWorkType'},
      {name:'图表',event:'bindChart'},
    ]
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
  bindCall:function(){
    wx.makePhoneCall({
      phoneNumber: '123456789'
    })    
  },
  bindScan:function(){
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },
  bindRecord:function(){
    wx.navigateTo({
      url: '/pages/service/record',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  bindGetNetWorkType:function(){
    
    wx.getNetworkType({
      success: function(res) {
        var networkType = res.networkType // 返回网络类型2g，3g，4g，wifi
        wx.showModal({
          title: '网络类型',
          content: '当前网络类型是是：' + networkType,
          showCancel:false
        })
      }
    })
  },
  bindChart:function(){
    wx.navigateTo({
      url: '/pages/service/chart',
      success: function(res){
        // success
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