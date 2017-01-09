// pages/service/chart.js
var wxCharts = require('../../utils/wxcharts-min.js');

Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
    new wxCharts({
        canvasId: 'pieCanvas',
        type: 'pie',
        series: [{
            name: 'cat1',
            data: 50,
        }, {
            name: 'cat2',
            data: 30,
        }, {
            name: 'cat3',
            data: 1,
        }, {
            name: 'cat4',
            data: 1,
        }, {
            name: 'cat5',
            data: 46,
        }],
        width: 360,
        height: 300,
        dataLabel: true
    });
    new wxCharts({
      canvasId: 'ringCanvas',
      type: 'ring',
      series: [{
          name: '成交量1',
          data: 15,
      }, {
          name: '成交量2',
          data: 35,
      }, {
          name: '成交量3',
          data: 78,
      }, {
          name: '成交量4',
          data: 63,
      }],
      width: 320,
      height: 200,
      dataLabel: false
    });
    new wxCharts({
        canvasId: 'lineCanvas',
        type: 'line',
        categories: ['2012', '2013', '2014', '2015', '2016', '2017'],
        series: [{
            name: '成交量1',
            data: [0.15, 0.2, 0.45, 0.37, 0.4, 0.8],
            format: function (val) {
                return val.toFixed(2) + '万';
            }
        }, {
            name: '成交量2',
            data: [0.30, 0.37, 0.65, 0.78, 0.69, 0.94],
            format: function (val) {
                return val.toFixed(2) + '万';
            }
        }],
        yAxis: {
            title: '成交金额 (万元)',
            format: function (val) {
                return val.toFixed(2);
            },
            min: 0
        },
        width: 320,
        height: 200
    });
    new wxCharts({
        canvasId: 'columnCanvas',
        type: 'column',
        categories: ['2012', '2013', '2014', '2015', '2016', '2017'],
        series: [{
            name: '成交量1',
            data: [15, 20, 45, 37, 4, 80]
        }, {
            name: '成交量2',
            data: [70, 40, 65, 100, 34, 18]
        }],
        yAxis: {
            format: function (val) {
                return val + '万';
            }
        },
        width: 320,
        height: 200
    });
    new wxCharts({
        canvasId: 'areaCanvas',
        type: 'area',
        categories: ['2016-08', '2016-09', '2016-10', '2016-11', '2016-12', '2017'],
        series: [{
            name: '成交量1',
            data: [70, 40, 65, 100, 34, 18],
            format: function (val) {
                return val.toFixed(2) + '万';
            }
        }, {
            name: '成交量2',
            data: [15, 20, 45, 37, 4, 80],
            format: function (val) {
                return val.toFixed(2) + '万';
            }
        }],
        yAxis: {
            format: function (val) {
                return val + '万';
            }
        },
        width: 320,
        height: 200
    });

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
  onPullDownRefresh: function(){
    wx.stopPullDownRefresh()
  }
})