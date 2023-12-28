const express = require('express');
const path = require('path');

const api = require('./routes/index');

const PORT = process.env.PORT || 3001;

const app = express();

//set parsing type
app.use(express.json())
app.use(express.urlencoded({extended: true}));
//expose static files
app.use(express.static('public'));

app.use('/api', api);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
})

app.listen(PORT, () => {
    console.log('App listening at localhost:' + PORT);
})