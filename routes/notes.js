const notes = require('express').Router();
const fs = require('fs/promises');
const {v4: uuidv4} = require('uuid');

notes.get('/', (req, res) => {

    //read the notes data out of the file. 
    fs.readFile('./db/db.json').then((data) => {
        return JSON.parse(data);

    }).then((data) => {
        //parsed data from file.
        res.json(data);
    })
});

notes.post('/', (req, res) => {

    const {title, text} = req.body;
    if (req.body) {


        //read out current DB. 
        fs.readFile('./db/db.json').then((data) => {

            //parse the data into usable JS
            const currentData = JSON.parse(data);

            const newNote = {
                id: uuidv4(),
                title: title,
                text: text,
            }

            //push new note on to the currentData array
            currentData.push(newNote);

            //convert it back to a string
            const updatedData = JSON.stringify(currentData);

            //write the data back to the file.
            fs.writeFile('./db/db.json', updatedData);
        });
    }
    res.code = 200;
    res.json('SUCCESSFUL NEW NOTE');
});

notes.delete('/:id', (req, res) => {
    let foundItem = false;
    //check if id is in the params
    if (req.params.id) {
        //read out current DB data
        fs.readFile('./db/db.json').then((data) => {

            //parse the data into usable JS
            let currentData = JSON.parse(data);

            //iterate over data and check if the id matches for delete
            let updatedData = currentData.filter(note => {
                const notNoteToDelete = note.id !== req.params.id;

                if (!notNoteToDelete) {
                    foundItem = true;
                }


                return notNoteToDelete;

            });

            //write the data back to the file.
            const stringData = JSON.stringify(updatedData);
            fs.writeFile('./db/db.json', stringData).then(() => {
                if (!foundItem) {
                    res.code = 404;
                    res.json('NO MATCHING ID FOUND FOR DELETE');
                }
                else {
                    res.code = 200;
                    res.json('SUCCESSFULLY DELETED NOTE');
                }
            })
        });
    }
    else {
        res.code = 404;
        res.json('NO ID PARAMS FOUND FOR DELETE');
    }
});




module.exports = notes;