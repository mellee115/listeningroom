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

//calculate the fill the for the progress bar
appCtrl.prototype.updateBar = function(){
	let aud = document.getElementById('player');
	let pb = document.getElementById('bar');

	let val = (aud.currentTime / aud.duration) * 100;
	console.log(val);
	pb.css('width', val + 'px');
}