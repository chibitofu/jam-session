let playButton = document.getElementById("play-button");

let playStation = function(station) {
	if (station) {
		let stationName = station;
		let audioFile = document.getElementById(stationName);

		audioFile.play()
	}
}

let playSound = function(schedule) {
	var d = new Date();
  	var t = d.toLocaleTimeString();
  	document.getElementById("sound-loop").innerHTML = t;
	playStation("station-1")
}

playButton.onclick = function() {
	playStation("station-1")
	var soundInterval = setInterval(playSound, 3000);
	setTimeout(function( ) { clearInterval(soundInterval); }, 12000);
}
