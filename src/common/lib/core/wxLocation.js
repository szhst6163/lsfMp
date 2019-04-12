/**
 * 定位
 */
import wepy from 'wepy'
import api from 'comm/api'
import {c8} from 'lib/color'

export default {
  alert (city) {
    return new Promise((f, r) => {
      wx.showModal({
        content: '定位到您当前城市是'+ city +'，是否切换城市？',
        confirmColor: c8,
        success: function(res) {
          if (res.confirm) {
            f();
          }else if(res.cancel){
            r();
          }
        }
      })
    });
  },
  getLocation(){
    return new Promise((f, r) => {
      wx.getLocation({
        success(res){
          let lon = res.longitude;
          let lat = res.latitude;
          wepy.request({
            url: api.getCityByLatLong,
            data: {
              lon,lat
            }
          }).then(res => {
            f(res);
          }).catch(res => {
            r(res);
          })
        },
        fail (res) {
          r(res);
        }
      })
    });
  },
  match (cityNo) {
    return new Promise((f, r) => {
      this.getLocation()
        .then(res => {
          if(res.cityNo !== cityNo){
            this.alert(res.cityName)
              .then(v => {
                f(res);
              }).catch(v => {
                r(v);
              });
          }
        }).catch(v => {
          r(v);
      });
    });
  }
}
