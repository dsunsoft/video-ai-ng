/**
 * 转化成RMB元字符串
 * @param digits 当数字类型时，允许指定小数点后数字的个数，默认2位小数
 */
// tslint:disable-next-line:no-any
export function yuan(value: any, digits: number = 2): string {
  if (typeof value === 'number') value = value.toFixed(digits);
  return `&yen ${value}`;
}
//截取字符串多余的使用点点代替
export function cutStr(value: string, maxLength: number) {
  if (value == "" || value == null) {
    return "";
  }
  var len = 0;
  var cnLen = 0;
  for (var i = 0; i < value.length; i++) {
    // 判断是否中文字符
    if (value.charCodeAt(i) > 127 || value.charCodeAt(i) == 94) {
      len += 2;
      cnLen += 2;
    } else {
      len++;
    }
  }
  if (len <= maxLength) {
    return value;
  }
  if (cnLen > maxLength) {
    return value.substr(0, maxLength) + "...";
  }
  return value.substr(0, maxLength + 3) + "...";
}
