/*
  mozVibrate polyfill by Chris Heilmann (@codepo8)
  simulates the Vibration API of Firefox OS:
  https://bugzilla.mozilla.org/show_bug.cgi?id=679966
*/
(function() {
if (!navigator.mozVibrate) {
  var s = document.createElement('style');
  s.innerHTML = 'body.buzz {animation: buzz 100ms infinite;-webkit-animation: buzz 100ms infinite;}@keyframes buzz {0% {margin: 10px;}50% {margin: 12px 12px;}75% {margin: 10px;}100% {margin: 8px 8px;}}@-webkit-keyframes buzz {0% {margin: 10px;}50% {margin: 12px 12px;}75% {margin: 10px;}100% {margin: 8px 8px;}}';
  document.getElementsByTagName('head')[0].appendChild(s);
  navigator.mozVibrate = function(duration) {
    if (typeof duration === 'object' && duration.length) {
    } else {
      duration = [duration];
    }
    navigator.mozVibrate.count = 0;
    navigator.mozVibrate.duration = duration;
    navigator.mozVibrate.buzz();
  };
  navigator.mozVibrate.buzz = function() {
    document.body.className += ' buzz';
    document.title = '*buzz* ' + document.title;
    window.setTimeout(
      navigator.mozVibrate.stop,
      navigator.mozVibrate.duration[navigator.mozVibrate.count]
    );
  };
  navigator.mozVibrate.stop = function() {
    document.title = document.title.replace('*buzz* ', '');
    document.body.className = document.body.className.replace(' buzz', '');
    if (navigator.mozVibrate.duration[navigator.mozVibrate.count+1]) {
      window.setTimeout(
        navigator.mozVibrate.buzz,
        navigator.mozVibrate.duration[navigator.mozVibrate.count+1]
      );
    }
    navigator.mozVibrate.count += 2;
  };
}
})();