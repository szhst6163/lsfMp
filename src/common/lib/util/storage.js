/**
 * Created by TIAN on 2017/10/12.
 * sessionStorage 存储
 */
export default {
  put (key, val) {
    try {
      wx.setStorageSync(key, val);
    }catch (e) {
    }
  },
  get (key) {
    try {
      return wx.getStorageSync(key);
    }catch (e) {
      return undefined;
    }
  },
  clear (key) {
    try {
      if(typeof key === "undefined"){
        wx.clearStorageSync();
      }else{
        wx.removeStorageSync(key);
      }
    } catch (e) {
    }
  }
}
