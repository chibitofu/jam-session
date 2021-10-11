var parseString = require('xml2js').parseString;
var fs = require('fs');

var stationNameList = [
  "erkner",
  "hauptbahnhof",
  "rathaus-steglitz",
  "tegel",
  "westkreuz",
  "wittenau",
  "zoo-garten",
]

var stationToTimesMap = {};

stationNameList.forEach(function (stationName, idx) {
  var xmlString = fs.readFileSync(`./station-timetables/formatted/${stationName}.xml`).toString('utf-8');
  parseString(xmlString, function (err, result) {
    var trains = result.timetable.s;

    stationToTimesMap[stationName] = [];
    trains.forEach(function (train, idx) {
      if (train.ar) {
        var timestamp = train.ar[0].$.pt;
        stationToTimesMap[stationName].push(timestamp);
      }
    });
  });
});

var exportString = `const stationToTimeMap = ${JSON.stringify(stationToTimesMap, null, 2)};\nexport stationToTimesMap;`

fs.writeFileSync(`./station-timetables/stationToTimeMap.js`, exportString);
