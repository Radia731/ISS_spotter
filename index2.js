const { nextISSTimesForMyLocation } = require('./iss_promised.js');

// Conversion for date and print for loop
const printTimes = function(passTimes) {
  for (let i in passTimes) {
    const date = new Date(passTimes[i].risetime * 1000);
    const seconds = passTimes[i].duration;
    console.log(`Next pass at ${date.toString()} for ${seconds} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printTimes(passTimes);
  })
  .catch((error) => {
    console.log('It didn\'t work: ', error.message);
  })