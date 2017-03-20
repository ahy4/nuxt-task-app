import axios from '~plugins/axios';

export default () => axios.get('/api/todos').then(({data}) => {
  const messages = data.filter(({deadline}) => {
    const diff = +new Date(deadline) - new Date();
    return diff > -1 * 24 * 60 * 60 * 1000 && diff < 2 * 24 * 60 * 60 * 1000;
  }).map(({name}) => name);
  notifyMessages(messages);
});

function notifyMessages(messages) {
  if (+new Date() - localStorage.getItem('send-notify-date') < 24 * 60 * 60 * 1000) {
    return console.warn('まだ通知から1日経ってません');
  }
  // ブラウザが通知をサポートしているか確認する
  if (!('Notification' in window)) {
    console.error('このブラウザはシステム通知をサポートしていません');
  } else if (Notification.permission === 'granted') {   // すでに通知の許可を得ているか確認する
    // 許可を得ている場合は、通知を作成する
    messages.forEach(message => new Notification(message));
  } else if (Notification.permission !== 'denied') {   // 許可を得ていない場合は、ユーザに許可を求めなければならない
    Notification.requestPermission(function (permission) {
      // ユーザが許可した場合は、通知を作成する
      if (permission === 'granted') {
        messages.forEach(message => new Notification(message));
      }
    });
  }
  localStorage.setItem('send-notify-date', +new Date());
}
