'use strict'

//Controller with the boolean attribute isPlaying to indicate a song is playing and an array of Song objects
function appCtrl(){
	this.isPlaying = false;
	this.playlist = [];
}
angular.module('myApp',[]).controller('appCtrl', appCtrl);

//The Song class
function Song(){
	this.artist;
	this.name;
	this.length;
	this.album;
}

//the addSong method pushes a Song object to the playlist array in the controller
appCtrl.prototype.addSong = function(songObject){
	this.playlist.push();
}

//play method changes the boolean to true to indicate a song is playing
appCtrl.prototype.playAudio = function(){
	this.isPlaying = !this.isPlaying;

} 

//pause method changes the boolean back to the state of false indicating no song is playing
appCtrl.prototype.pauseAudio = function(){ 
	this.isPlaying = !this.isPlaying;
} 

//calculate the fill the for the progress bar using the addEventListner HTML DOM method
let timer;
let percent = 0;
let aud = document.getElementById('player');

aud.addEventListener("playing", function(_event) {
	let duration = _event.target.duration;
  	updateBar(duration, aud);
});

aud.addEventListener("pause", function(_event) {
  	clearTimeout(timer);
});

let updateBar = function(duration, audioElement) {
	let progress = document.getElementById("bar");
	let incr = 10/duration;
	percent = incr * audioElement.currentTime * 10;
	progress.style.width = percent + '%';
	startTimer(duration, audioElement);
}

let startTimer = function(duration, audioElement){ 
  if ( percent < 100 ) {
    timer = setTimeout(function (){
    	updateBar(duration, audioElement)}, 100);
  }
}
