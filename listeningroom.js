'use strict'

//The Song constructor
function Song(artist, name, albumart, src){
	this.artist = artist;
	this.name = name;
	this.albumart = albumart;
	this.src = src;
}

//Controller with the boolean attribute isPlaying to indicate a song is playing and an array of Song objects
function appCtrl(){
	this.isPlaying = false; 
	this.playlist = [(new Song("Coldplay","Violet Hill","Coldplay - albumart.jpg","Coldplay - Violet Hill"), 
		(new Song("Beirut", "Perth", "Beirut - albumart.png", "Beirut - Perth.mp3"),
		(new Song("Fleet Foxes", "White Winter Hymnal", "Fleet Foxes - albumart.jpg", "Fleet Foxes - White Winter Hymnal.mp3"))))];
}

angular.module('myApp',[]).controller('appCtrl', appCtrl);

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

aud.addEventListener("pause", function(_event) { clearTimeout(timer);});

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