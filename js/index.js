let playButton = document.getElementById("play-button");
const stationTimeData = stationToTimeMap

playButton.onclick = function() {
	let dt = new Date()
	let soundInterval = setInterval(findTime, 1000, stationTimeData, dt);
	setTimeout(function( ) { clearInterval(soundInterval); }, 15000);
}

let playStation = function(station) {
	if (station) {
		let stationName = station;
		let audioFile = document.getElementById(stationName);

		audioFile.play()
	}
}

let findStartTime = function(data) {
	let startTime;

	for (const [key, value] of Object.entries(data)) {
		let timesToNumber = value.map(function(item) {
    		return Math.round(parseInt(item.slice(-4), 10));
		});
		let currentMin = Math.min(...timesToNumber);

		if (!startTime) {
			startTime = currentMin
		} else if (currentMin < startTime) {
			startTime = currentMin
		}
	}

	return startTime
}

let convertToTimeline = function(data) {
	const start = findStartTime(data)
	let convertedTimeData = {};
	
	for (const [key, value] of Object.entries(data)) {
		let timesToNumber = value.map(function(item) {
    		return Math.round((parseInt(item.slice(-4), 10) - start) / 10);
		});

		convertedTimeData[key] = timesToNumber
	}

	return convertedTimeData
}

let findTime = function(schedules, startTime) {
	let currentTime = parseInt((Date.now() - startTime) / 1000)
	const stationTimes = convertToTimeline(schedules)

	document.getElementById("sound-loop").innerHTML = currentTime;

	for (const [key, value] of Object.entries(stationTimes)) {
		let index = value.indexOf(currentTime)

	  	if (index !== -1) {
	  		stationTimes[key].splice(index,1)
	  		playSound(key)
	  	}
	}
}

let playSound = function(station) {
	playStation(station)
}
