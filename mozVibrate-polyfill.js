/*
  vibrate/mozVibrate polyfill by Chris Heilmann (@codepo8)
  simulates the Vibration API of Firefox OS:
  
  https://bugzilla.mozilla.org/show_bug.cgi?id=679966
*/

(function() {

if (!navigator.mozVibrate || !navigator.vibrate) {
  var s = document.createElement('style');
  s.innerHTML = 'body.buzz {animation: buzz 100ms infinite;-webkit-animation: buzz 100ms infinite;}@keyframes buzz {0% {margin: 10px;}50% {margin: 12px 12px;}75% {margin: 10px;}100% {margin: 8px 8px;}}@-webkit-keyframes buzz {0% {margin: 10px;}50% {margin: 12px 12px;}75% {margin: 10px;}100% {margin: 8px 8px;}}';
  document.getElementsByTagName('head')[0].appendChild(s);
  navigator.mozVibrate = function(duration) {
    if (!duration) {
      clearTimeout(navigator.mozVibrate.current);
      navigator.mozVibrate.duration = [];
      navigator.mozVibrate.stop();
    }
    if (typeof duration === 'object' && duration.length) {
    } else {
      duration = [duration];
    }
    navigator.mozVibrate.count = 0;
    navigator.mozVibrate.duration = duration;
    navigator.mozVibrate.buzz();
  };
  navigator.mozVibrate.buzz = function() {
    if (navigator.mozVibrate.current) {
      clearTimeout(navigator.mozVibrate.current);
    }
    document.body.className += ' buzz';
    document.title = '*buzz* ' + document.title;
    navigator.mozVibrate.current = window.setTimeout(
      navigator.mozVibrate.stop,
      navigator.mozVibrate.duration[navigator.mozVibrate.count]
    );
  };
  navigator.mozVibrate.stop = function() {
    if (navigator.mozVibrate.current) {
      clearTimeout(navigator.mozVibrate.current);
    }
    document.body.className = document.body.className.replace(' buzz', '');
    document.title = document.title.replace('*buzz* ', '');
    if (navigator.mozVibrate.duration[navigator.mozVibrate.count+1]) {
      navigator.mozVibrate.current = window.setTimeout(
        navigator.mozVibrate.buzz,
        navigator.mozVibrate.duration[navigator.mozVibrate.count+1]
      );
    }
    navigator.mozVibrate.count += 2;
  };
  navigator.vibrate = navigator.mozVibrate;
}

})();


(function(){

  if (document.querySelector) {

    var rollover = document.querySelector('#rollover');
    rollover.className = 'js';

    var images = rollover.querySelectorAll('img');
    var all = images.length;
    var width = rollover.offsetWidth;
    var ox = rollover.offsetLeft;
    var boundarywidth = width / all;
    var current = 0;
    var x = 0;
    var index = 0;
    var touched = false;

    setcurrent = function(index) {
      if (images[index]) {
        images[current].className = '';
        images[index].className = 'current';
        current = index;
      }
    };

    findindex = function(x) {
      index = parseInt((x - ox) / boundarywidth, 10);
      if (index !== current) {
        setcurrent(index);
      }
    }

    rollover.addEventListener('mousemove', function(ev) {
      if (!touched) {
        findindex(ev.clientX);
      }
    }, false);

    rollover.addEventListener('touchstart', function(ev) {
      touched = true;
    }, false);

    rollover.addEventListener('touchend', function(ev) {
      touched = false;
    }, false);

    rollover.addEventListener('touchmove', function(ev) {
      if (touched) {
        findindex(ev.changedTouches[0].clientX);
        ev.preventDefault();
      }
    }, false);

    rollover.addEventListener('keydown', function(ev) {
      var key = ev.char || ev.key || ev.which;
      if (key === 37) { index = index - 1;}
      if (key === 39) { index = index + 1;}
      if (index < 0) {index = 0;}
      if (index > all - 1) {index = all - 1;}
      setcurrent(index);
    }, false);

    if (rollover.querySelector('.current')) {
      for (var i=0;i<all;i++) {
        if (images[i].className === 'current') {
          current = i;
          break;
        }
      }
    } else {
      setcurrent(current);
    }
  }
})();