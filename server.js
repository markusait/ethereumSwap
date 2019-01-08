const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const con = mongoose.createConnection('mongodb://localhost/postdb');

const port = process.env.PORT || 3012;

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// DB Config
const db = require('./config.js').mongoURI;

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

app.get('/', function (req, res) {
  app.use(express.static(path.join(__dirname, 'client/build')));
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
// Serve static assets if in production
// if (process.env.NODE_ENV === 'production') {
if (false) {
  // Set static folder
  app.use(express.static(path.join(__dirname, 'public')));

  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client/public/index.html'));
  })
}
// https://stackoverflow.com/questions/43557390/react-router-and-express-get-conflict
// app.get('/*', function(req, res) {
//     res.sendFile(path.join(__dirname, '/public/index.html'), function(err) {
//       if (err) {
//         res.status(500).send(err)
//       }
//     });
// });

// app.get('/api/customers', (req, res) => {
//   const customers = [
//     {id: 1, firstName: 'John', lastName: 'Doe'},
//     {id: 2, firstName: 'Brad', lastName: 'Traversy'},
//     {id: 3, firstName: 'Mary', lastName: 'Swanson'},
//   ];
//
//   res.json(customers);
// });


app.listen(port, () => console.log(`Server started on port ${port}`));
