'use strict';
import storage from "../common/lib/util/storage";

//index.js
//获取应用实例
var app = getApp();

Page({
  data: {
    jdConfig: {},
    imgUrl:'',
    resourImg:"",
    scale:null
  },
  onPosterSuccess: function onPosterSuccess(e) {
    var detail = e.detail;
    this.setData({
      imgUrl:detail
    });
  },
  back(){
    storage.put("isBack","true");
    wx.navigateBack();
  },
  share(){
    wx.showShareMenu()
  },
  save(){
    wx.navigateBack();
  },
  previewPic(){
    wx.previewImage({
      current: this.data.imgUrl,
      urls: [this.data.imgUrl]
    });
  },
  onPosterFail: function onPosterFail(err) {
    console.error(err);
  },
  onLoad(options) {
    this.scale = options.width*2/750;
    this.setData({
      resourImg:options.src
    });

      const config = {
        width: 750,
        height: 1334,
        backgroundColor: '#000',
        debug: false,
        blocks: [{
          width: 750,
          height: 270/this.scale,
          x: 0,
          y: (options.height*2-270+25)/this.scale,
          backgroundColor: '#000',
        }],
        images: [
          {
            width: options.width*2/this.scale,
            height: options.height*2/this.scale,
            x: 0,
            y: 0,
            url: options.src
            // url: 'https://07imgmini.eastday.com/mobile/20180913/20180913112727_ff20a19a08da2cff88640ef67597b68c_1.jpeg'

          },
          {
            x: 39,
            y: (options.height*2-139-50)/this.scale,
            width:672,
            height:154,
            url: options.src1
            // url: 'https://07imgmini.eastday.com/mobile/20180913/20180913112727_ff20a19a08da2cff88640ef67597b68c_1.jpeg'

          }
        ]
      }
      const poster = this.selectComponent('#poster');
      poster.create(config);
  }
});
