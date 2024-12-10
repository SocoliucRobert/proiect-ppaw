class SingletonService {
    constructor() {
      this.timestamp = Date.now(); // momentul de creare a obiectului
    }
  
    getTimestamp() {
      return this.timestamp;
    }
  }
  
  const singletonInstance = new SingletonService(); // doar o instanta pentru toata aplicatia
  module.exports = singletonInstance;
  