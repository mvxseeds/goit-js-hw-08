import throttle from 'lodash.throttle';
import Player from '@vimeo/player';


const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const STORAGE_PLAYTIME_KEY = 'videoplayer-current-time';


const onPlay = function(data) {
    const savedPlaytime = localStorage.getItem(STORAGE_PLAYTIME_KEY);
    
    if (savedPlaytime) {
        player.setCurrentTime(savedPlaytime);
    }
};

const onTimeUpdate = function(data) {
    let currentPlaytime = player.getCurrentTime().then(function(seconds) {
        // seconds = the current playback position
        localStorage.setItem(STORAGE_PLAYTIME_KEY, seconds);
    }).catch(function(error) {
        console.log("Error getting video player playtime value!")
    });
}

player.on('play', onPlay);
player.on('timeupdate', throttle(onTimeUpdate, 1000));
