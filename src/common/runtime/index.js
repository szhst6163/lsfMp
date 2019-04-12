/**
 * Created by TIAN on 2018/7/6.
 */
import storage from 'lib/util/storage'
import constant from 'comm/api/constant'
import {isObject, isString} from 'lib/util/dataType'

export default {
  verify (user) {
    return isObject(user) && isString(user.userId) && isString(user.mobile);
  },
  isLogin () {
    let user = storage.get(constant.USER);
    return this.verify(user);
  },
  getUser () {
    let user = storage.get(constant.USER);
    return this.verify(user) ? user : {};
  },
  setUser (user) {
    storage.put(constant.USER, user)
  },
  getServicePhone () {
    return '010-84578877'
  }
}
