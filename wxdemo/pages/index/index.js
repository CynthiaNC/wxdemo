//index.js
//获取应用实例
var app = getApp()
var url = 'https://m.douban.com/rexxar/api/v2/recommend_feed?';//alt=json&next_date=&loc_id=108288&gender=&birthday=&udid=9fcefbf2acf1dfc991054ac40ca5114be7cd092f&for_mobile=true

var parms =  {
    alt:'json',
    next_date:'',
    loc_id:108288,
    gender:'',
    birthday:'',
    udid:'9fcefbf2acf1dfc991054ac40ca5114be7cd092f',
    for_mobile:true
}

Page({
  data: {
    userInfo: {},
    data: {},
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this   

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      that.getData({
        success:function(data){                    
          that.setData({
            userInfo:userInfo,
            data:data.recommend_feeds
          })
        }
      })

    })

  },
  pullUpLoad:function () {
    console.log('hi')
    var that = this  
    parms.next_date='2016-12-31';
    that.getData({
        success:function(data){
          var newData = that.data.data.concat(data.recommend_feeds)
          that.setData({
            data:newData
          })
        }
      })
  },
  getData: function(option){
      wx.request({
        url: url,
        data: parms,
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
          // console.log(res)
          let data = res.data;
          option.success && option.success(data);
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
