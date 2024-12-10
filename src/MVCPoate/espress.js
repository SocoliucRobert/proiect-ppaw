const express = require('express');
const singletonService = require('./services/singletonService');
const ScopedService = require('./services/scopedService');
const TransientService = require('./services/transientService');
const cors = require('cors');  
const bodyParser = require('body-parser');

const app = express();
app.use(cors());  
app.use(bodyParser.json());  


app.get('/singleton', (req, res) => {
  res.json({
    type: 'Singleton',
    timestamp: singletonService.getTimestamp()
  });
});

app.get('/scoped', (req, res) => {
  const scopedService = new ScopedService(); // creare instanta pentru fiecare cerere
  res.json({
    type: 'Scoped',
    timestamp: scopedService.getTimestamp()
  });
});

app.get('/transient', (req, res) => {
  const transientService1 = new TransientService(); // prima instanta pentru cerere
  const transientService2 = new TransientService(); // a doua instanta pentru aceeasi cerere
  res.json({
    type: 'Transient',
    firstInstance: transientService1.getTimestamp(),
    secondInstance: transientService2.getTimestamp()
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
