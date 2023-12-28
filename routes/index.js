const router = require('express').Router();

const notesRouter = require('./notes');

//ROOT INDEX OF ALL APIS

router.use('/notes', notesRouter);

module.exports = router;