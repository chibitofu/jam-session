var format = require('xml-formatter');
var fs = require("fs");

var stationNameList = [
  "erkner",
  "hauptbahnhof",
  "rathaus-steglitz",
  "tegel",
  "westkreuz",
  "wittenau",
  "zoo-garten",
]

for (const stationName in stationNameList) {
  var fileString = fs.readFileSync(`./station-timetables/raw/${stationName}.xml`).toString('utf-8');
  var formattedXml = format(fileString);
  console.log(formattedXml);
}
