/**
 * Created by TIAN on 2018/7/10.
 * //返回当前天和星期
 */
import calendar from '../lib/util/calendar'

export default function (date, time) {
  const curDate = calendar.getDate();
  const format = 'yyyy-MM-dd';
  const newDate = calendar.format(date.replace(/\//g, '-'), format);
  let day = '周' + calendar.getWeek(date);
  const fullWeek = '星期' + day;
  if(calendar.format(curDate, format) === newDate){
    day= '今天';
  }else if(calendar.getOffsetDateStr(curDate, 1, format) === newDate){
    day= '明天';
  }else if(calendar.getOffsetDateStr(curDate, 2, format) === newDate){
    day= '后天';
  }

  return {
    week: day,
    fullWeek: fullWeek,
    date: calendar.format(newDate, 'MM-dd'),
    dateText: calendar.format(newDate, 'MM月dd日'),
    fullDate: newDate,
    time: calendar.format(newDate + ' ' + time, 'HH:mm')
  };
}
