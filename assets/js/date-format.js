export default function dateFormat(date) {
  // console.log(date);
  date = new Date(date);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  var d = date.getDate();
  var w = date.getDay();
  var wNames = ['日', '月', '火', '水', '木', '金', '土'];

  if (m < 10) {
    m = '0' + m;
  }
  if (d < 10) {
    d = '0' + d;
  }

  // フォーマット整形済みの文字列を戻り値にする
  return y + '年' + m + '月' + d + '日 (' + wNames[w] + ')';
};
