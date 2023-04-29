const { nextISSTimesForMyLocation } = require('./iss');

// Conversion for date and print for loop
const printTimes = function(passTimes) {
  for (let i in passTimes) {
    const date = new Date(passTimes[i].risetime * 1000);
    const seconds = passTimes[i].duration;
    console.log(`Next pass at ${date.toString()} for ${seconds} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printTimes(passTimes);
});