const express = require('express');
const path = require('path');
const fs = require('fs');
// Helper method for generating unique ids
// const uuid = require('./helpers/uuid');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET request for reviews
app.get('/api/notes', (req, res) => {

    // Obtain existing reviews
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          res.json(err)
        } else {
          // Convert string into JSON object
          const notes = JSON.parse(data);
          res.json(notes)
        }  
    });
    // // Log our request to the terminal
    // console.info(`${req.method} request received to get reviews`);
  });


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);