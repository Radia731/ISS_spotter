const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    return callback(null, data.ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    const success = JSON.parse(body).success;
    const message = JSON.parse(body).message;
    if (!success) {
      callback(`${message} for ${ip}`, null);
      return;
    }
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let coordinates = {};
    coordinates.latitude = JSON.parse(body).latitude.toString();
    coordinates.longitude = JSON.parse(body).longitude.toString();
    return callback(null, coordinates);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const latitude = coords.latitude;
  const longitude = coords.longitude;
  request(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`, (error, response, body) => {
    const success = JSON.parse(body).message;
    if (success !== 'success') {
      callback(`Fail to get data for ${latitude}, ${longitude}.`, null);
      return;
    }
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const rise = JSON.parse(body).response;
    callback(null, rise);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        callback(error, null);
        return;
      }
      fetchISSFlyOverTimes(coords, (error, rise) => {
        if (error) {
          callback(error, null);
          return;
        }
        callback(null, rise);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };
