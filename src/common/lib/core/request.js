import wepy from 'wepy';
import md5 from 'lib/util/md5'
import formatDate from 'lib/util/formatDate'

export default class Request extends wepy.app {

  constructor () {
    // this is not allowed before super()
    super();

    this.use('requestfix');
    this.use('promisify');

    let _list_wait = [];

    // 拦截request请求
    this.intercept('request', {
      // 发出请求时的回调函数
      config (p) {
        let pwd = '888888';//平台设置的密码
        let appKey= 'C10000027';//账号//C10000007
        let timestamp = formatDate(new Date(), "yyyyMMddHHmmss");
        let key = md5((timestamp+ pwd ).toString());

        p.header = {
          'Content-Type':'application/json'
        };

        let head = {
          appKey: appKey,
          tradeId: p.url,
          validCode: key,
          timestamp: timestamp
        };

        p.url = "http://172.16.10.134:1984/api/app/handler.do";

        p.data = {
          param: {
            head: head,
            body: p.data
          }
        };

        // 对所有request请求中的OBJECT参数对象统一附加时间戳属性
        p.timestamp = +new Date();
        // let key = md5((new Date().getTime() + Math.floor(Math.random() * 100000)).toString());

        // console.log('config request: ', p);
        // 必须返回OBJECT参数对象，否则无法发送请求到服务端

        if(p.wait && _list_wait.length === 0){
          _list_wait.push(head.tradeId);
          wx.showLoading({
            title: p.wait === true ? '加载中' : p.wait,
            mask: true
          });
          delete p.wait;
        }

        return p;
      },

      // 请求成功后的回调函数
      success (p) {
        // 可以在这里对收到的响应数据对象进行加工处理
        // console.log('request success: ', p);
        // 必须返回响应数据对象，否则后续无法对响应数据进行处理
        if(parseInt(p.data.head.errCode) === 0){
          return p.data.body;
        }

        return Promise.reject({errCode: p.data.head.errCode, msg: p.data.head.errMsg});
      },

      //请求失败后的回调函数
      fail (p) {
        // console.log('request fail: ', p);
        // 必须返回响应数据对象，否则后续无法对响应数据进行处理
        return p;
      },

      // 请求完成时的回调函数(请求成功或失败都会被执行)
      complete (p) {
        try{
          const key = p.data.head.tradeId;
          const index = _list_wait.indexOf(key);
          if(index > -1){
            _list_wait.splice(index, 1);
          }
          if(_list_wait.length === 0){
            wx.hideLoading();
          }

          if(parseInt(p.data.head.errCode) !== 0){
            wx.showToast({
              title: p.data.head.errMsg,
              icon: 'none',
              duration: 2000
            });
          }
        }catch(res){
          _list_wait = [];
          wx.hideLoading();
          wx.showToast({
            title: '请求超时~',
            icon: 'none',
            duration: 2000
          });
        }
      }
    });
  }
}
