// /pages/service/record.js
var show = null;
var recordSrc = '';
var count = 0;
Page({
  onReady: function (e) {

  },
  data: {
    showType:'录音',
    playType:'播放',
    notAllowedPlay:true,
    name: 'Record',
    author: 'Cynthia',
    src: '',
    loadding:false,
  },
  recordAction: function () {

    var that = this;
    if(that.data.showType == "录音"){
      that.setData({
        showType:'结束',
        loadding:true,
        notAllowedPlay:true,
      })
      wx.startRecord({
        success: function(res) {
          that.setData({
              src:res.tempFilePath,
              notAllowedPlay:false,
            })
        },
        fail: function(res) {
        },
        complete: function(res) {
          //录音完成 
        }
      })
      show = setInterval(function() {
        //闪烁
        that.setData({
          loadding:!that.data.loadding
        })
      }, 500)

      setTimeout(function() {
        //结束录音
        that.setData({
          showType:'录音',
          loadding:false
        })
        clearInterval(show)
        wx.stopRecord()
      }, 60000)

    }else if(that.data.showType == "结束"){
      wx.stopRecord();     
      that.setData({
        showType:'录音',
        loadding:false
      })
      clearInterval(show)
    }
    
  },
  audioPlay: function () {
    var that = this;
    
    if(that.data.playType == "播放"){
     that.setData({
        playType: "暂停"
      })
      count++;

      wx.playVoice({
        filePath:that.data.src,
        complete:function(){
          that.setData({
            playType: "暂停"
          })

          count--;
          if(count == 0){
            that.setData({
              playType: "播放"
            })
          }
        }
      })     
    } else if(that.data.playType == "暂停"){
      wx.pauseVoice({
        success: function(){
          that.setData({
            playType: "播放"
          })
        }
      })
    }
  }
})