class TransientService {
    constructor() {
      this.timestamp = Date.now(); // Se va crea de fiecare dată o instanță nouă
    }
  
    getTimestamp() {
      return this.timestamp;
    }
  }
  
  module.exports = TransientService; // Se exportă clasa, nu instanța
  