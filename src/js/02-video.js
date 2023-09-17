import Player from '@vimeo/player';
import throttle from 'lodash.throttle';


  const iframe = document.querySelector('#vimeo-player');
  const player = new Player(iframe);

  player.on('play', function () {
    console.log('played the video!');
  });

  player.getVideoTitle().then(function (title) {
    console.log('title:', title);
  });

  const onPlay = function (data) {
    const currentTime = data.seconds;
    localStorage.setItem('videoplayer-current-time', currentTime);
  };
  player.on('timeupdate', onPlay);

  const savedTime = localStorage.getItem('videoplayer-current-time');
  player
    .setCurrentTime(savedTime)
    .then(function (seconds) {
      console.log('Current playback time:', seconds);
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          if (savedTime < 0 || savedTime > player.getDuration()) {
            console.error('Error: Playback time is out of range.');
          }
          break;
        default:
          // some other error occurred
          break;
      }
    });
  const onTimeUpdate = throttle(function (data) {
    const currentTime = data.seconds;
    localStorage.setItem('videoplayer-current-time', currentTime);
    //console.log('Current playback time:', currentTime);
  }, 1000);
  player.on('timeupdate', onTimeUpdate);

