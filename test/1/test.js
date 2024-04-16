var audioElement = document.getElementById("myAudio");
audioElement.play();

var updateInterval = setInterval(function () {
  console.log(audioElement.currentTime);
}, 1000);

setTimeout(() => {
  audioElement.muted = true;
}, 5000);

setTimeout(() => {
  audioElement.muted = false;
}, 7000);

// setTimeout(() => {
//     audioElement.volume = 0.2;
//   }, 5000);

// setTimeout(() => {
//   audioElement.currentTime += 10;
// }, 5000);

// setTimeout(() => {
//     audioElement.playbackRate = 2;
//   }, 5000);
