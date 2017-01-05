//index.js
import {getData} from '../../app.js'
//获取应用实例
var app = getApp()
var url = 'https://m.douban.com/rexxar/api/v2/recommend_feed?';//alt=json&next_date=&loc_id=108288&gender=&birthday=&udid=9fcefbf2acf1dfc991054ac40ca5114be7cd092f&for_mobile=true
var  swiperImage = [
'../../image/20170105090109.png',
'https://img1.doubanio.com/view/photo/photo/public/p2267258937.jpg',
'https://img1.doubanio.com/view/photo/photo/public/p2267258609.jpg','https://img3.doubanio.com/view/photo/photo/public/p2267258431.jpg','https://img5.doubanio.com/view/photo/photo/public/p2267257086.jpg',
]

var parms =  {
    alt:'json',
    next_date:'',
    loc_id:108288,
    gender:'',
    birthday:'',
    udid:'9fcefbf2acf1dfc991054ac40ca5114be7cd092f',
    for_mobile:true,
    scrollTop:0
}

Page({
  data: {
    userInfo: {},
    data: {},
    swiperImage:swiperImage,
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
      that.setData({
          userInfo:userInfo
        })

    })
    getData({
        url:url,
        parms:parms,
        success:function(data){                    
          that.setData({
            data:data.recommend_feeds
          })
        }
      })


  },
  pullUpLoad:function () {
    console.log('hi')
    var that = this  
    parms.next_date='2016-12-31';
    getData({
        url:url,
        parms:parms,
        success:function(data){
          var newData = that.data.data.concat(data.recommend_feeds)
          that.setData({
            data:newData
          })
        }
      })
  },
  onPullDownRefresh: function(){
    wx.stopPullDownRefresh()
  },
  top:function(){
    this.setData({
      scrollTop:0
    })
  }
  
})
