// pages/books/book.js
import {getData} from '../../app.js'
var url='https://frodo.douban.com/jsonp/subject_collection/book_fiction/items?os=ios&callback=jsonp1&start=0&count=8&loc_id=0&_=1483446916795'

Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    getData({
      url:url,
      dataName:'subject_collection_items',
      success:function(d){
        
        var data = d.replace(/^jsonp1\(/,'')
        data = data.replace(/\)$/,'')
        data=JSON.parse(data);
        console.log(data)
        that.setData({
          data:data.subject_collection_items
        })
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