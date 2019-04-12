/**
 * Created by TIAN on 2018/7/7.
 */
import wepy from 'wepy';
import {c8} from 'lib/color'

export default {
  alert (mse, title) {
    return wepy.showModal({
      title: title || '提示',
      content: mse,
      confirmColor: c8,
      showCancel: false
    })
  },
  confirm (msg, title, confirmText, cancelText) {
    return wepy.showModal({
      title: title || '提示',
      content: msg,
      confirmColor: c8,
      confirmText: confirmText || '确定',
      cancelText: cancelText || '取消'
    })
  },
  toast (msg) {
    return new Promise(f => {
      wx.showToast({
        title: msg,
        icon: 'none',
        duration: 2000
      });
      setTimeout(() => {
        f();
      }, 2000);
    });
  }
}
