const express = require('express');
const path = require('path');
const fs = require('fs');
// Helper method for generating unique ids
// const uuid = require('./helpers/uuid');

const PORT = process.env.PORT||3001;

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

// GET request for notes
app.get('/api/notes', (req, res) => {

    // Obtain existing notes
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

app.post ('/api/notes', (req, res) => {
    const { title, text } = req.body;
    // create a new note adding an id to it and replace req.body with new note
    
    // Obtain existing notes
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          // Convert string into JSON object
          const notes = JSON.parse(data);
  
          // Add a new note
          notes.push(req.body);
  
          // Write updated notes back to the file
          fs.writeFile(
            './db/db.json',
            JSON.stringify(notes, null, 4),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully updated notes!')
          );
        }
      });
      res.status(201).json(req.body);
}
)

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);