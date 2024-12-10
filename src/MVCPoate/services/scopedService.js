class ScopedService {
    constructor() {
      this.timestamp = Date.now(); // ficare cerere cu time stamp nou
    }
  
    getTimestamp() {
      return this.timestamp;
    }
  }
  
  module.exports = ScopedService; // exportare clasa in loc instanta
  