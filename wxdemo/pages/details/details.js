// pages/details/details.js
import {getData} from '../../app.js'
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options.title)
    var that = this;
    var url = `https://api.douban.com/v2/book/${options.title}`
    //`https://api.douban.com/v2/book/1220563`//`

     that.setData({
          id:options.title
        })
    getData({
      url:url,
      success:function(data){

        if(data.code === 6000) {
          that.setData({
            data: {
              title:options.title,
              summary:data.msg
            }
          })
        } else {
            that.setData({
              data: data
            })
        }

      }
    })
    
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
  }
})