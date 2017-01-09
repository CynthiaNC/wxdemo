// pages/details/details.js
import {getData} from '../../app.js'
Page({
  data:{
    list:{
      378:{

      }
    },
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

    var that = this;
    var url = `https://api.douban.com/v2/book/${options.title}`//图书接口

    //设置title
    wx.setNavigationBarTitle({
      title: options.type || '豆瓣',
      success: function(res) {
        // success
      }
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
              data: data,
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
  },
  toPay:function(option){
    var that = this;
        wx.showModal({
          title: '阅读',
          content: `是否在线阅读《${that.data.data.title}》？`,
          confirmColor: '#8bc34a',
          cancelColor: '#aaa',
          success: function(res) {
            if (res.confirm) {
              wx.requestPayment({
                'timeStamp': '1483331718',
                'nonceStr': '29222992',
                'package': 'prepay_id=wx2017010212351476048bcaf10348499169',
                'signType': 'MD5',
                'paySign': '6D916D7DDD9EC5A9AAD5AC71911953ED',
                'success':function(res){
                  console.log('success')
                  console.log(res)
                  wx.showToast({
                    title: '成功',
                    icon: 'success',
                    duration: 2000
                  })
                },
                'fail':function(res){
                  console.log('fail')
                  console.log(res)
                  wx.showToast({
                    title: res.err_desc,
                    icon: '',
                    duration: 2000
                  })
                }
              })

            }else{
              console.log('用户点击取消')
            }
          }
        })


  },
  like:function(e){
    var parms = e.currentTarget.dataset;
    var list = this.data.list;
    if(list[parms.id] == undefined ) {
      list[parms.id]={};
      list[parms.id].like = true;
    }
    else if(list[parms.id].like == undefined) 
      list[parms.id].like = true;
    else 
      list[parms.id].like = !list[parms.id].like;
    
    this.setData({
      list:list
    })
  }

})
