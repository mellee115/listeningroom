'use strict'

//The Song constructor
function Song(artist, name, albumart, src){
	this.artist = artist;
	this.name = name;
	this.albumart = albumart;
	this.src = src;
}

//Controller with the boolean attribute isPlaying to indicate a song is playing,
// an array of Song objects called playlist,
// and an integer representing the position in the playlist
function appCtrl(){
	this.isPlaying = false; 
	this.playlist = [
		(new Song ("Gvidon", "Mesmerizing", "Gvidon.jpg", "Gvidon - Mesmerizing.mp3")),
		(new Song ("FASSounds", "Coding Night", "FASSounds.jpg", "FASSounds - Coding Night.mp3")),
		(new Song ("EvgenyBardyuzha", "Autobahn", "", "EvgenyBardyuzha - Autobahn.mp3")),
		(new Song ("Music Unlimited", "Jazzy Hip Hop Boom Bap", "", "Music Unlimited - Jazzy Hip Hop Boom Bap.mp3")),
	];
	this.playlistPos = 0;
}

angular.module('myApp',[]).controller('appCtrl', appCtrl);

let aud = document.getElementById('player');

//the addSong method pushes a Song object to the playlist array in the controller
appCtrl.prototype.addSong = function(songObject){

	//not implemented currently
}

//playAudio method changes the boolean to true to indicate a song is playing
appCtrl.prototype.playAudio = function(){
	if(!this.isPlaying){
		this.isPlaying = !this.isPlaying
	};
	aud.load();
	aud.play();

	//detect song end and advances to the next song in playlist automatically when song ends
	aud.addEventListener("ended", function(_event){
		alert("The current song has ended.");
		
		//automatic forwarding to next song not yet implemented
		//alert("Calling nextSong method now.");
		//this.nextSong();
	});
} 



//pauseAudio method changes the boolean back to the state of false indicating no song is playing
appCtrl.prototype.pauseAudio = function(){ 
	if(this.isPlaying){
		aud.pause();
		this.isPlaying = !this.isPlaying;
	}
} 

//nextSong method changes increments the playlistPos 
appCtrl.prototype.nextSong = function(){

	//don't allow the user to click ahead if the end of playlist is reached
	if((this.playlistPos + 1) == this.playlist.length){
		return;
	}

	aud.pause();
	percent = 0;
	clearTimeout(timer);
	++this.playlistPos;
	aud.src = this.playlist[this.playlistPos].src;
	this.playAudio();
}


//calculate the fill the for the progress bar using the addEventListner HTML DOM method
let timer;
let percent = 0;

aud.addEventListener("playing", function(_event) {
	let duration = _event.target.duration;
  	updateBar(duration, aud);
});

aud.addEventListener("pause", function(_event) { 
	clearTimeout(timer);
});

let updateBar = function(duration, audioElement) {
	let progress = document.getElementById("bar");
	let incr = 10 / duration;
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