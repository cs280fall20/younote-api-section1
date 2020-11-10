const express = require("express");
const { addSampleNotes } = require("../data/notes.js");
const NoteDao = require("../model/NoteDao.js");
const router = express.Router();

const notes = new NoteDao();
addSampleNotes(notes);

router.get("/api/notes", (req, res) => {
  const author = req.query.author;
  notes
    .readAll(author)
    .then((notes) => res.json({ data: notes }))
    .catch((err) => erroHandler(res, 500, err));
});

router.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  notes
    .read(id)
    .then((note) => res.json({ data: note }))
    .catch((err) => erroHandler(res, 500, err));
});

router.post("/api/notes", (req, res) => {
  const author = req.body.author;
  const content = req.body.content;
  notes
    .create(content, author)
    .then((note) => res.status(201).json({ data: note }))
    .catch((err) => erroHandler(res, 400, err)); // TODO separate between 500- & 400- errors
});

router.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  notes
    .delete(id)
    .then((note) => {
      note 
        ? res.json({ data: note })
        : erroHandler(res, 404, "Resource not found")
    } )
    .catch((err) => erroHandler(res, 500, err));
});

router.put("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const author = req.body.author;
  const content = req.body.content;
  notes
    .update(id, content, author)
    .then((note) => {
      note 
        ? res.json({ data: note })
        : erroHandler(res, 404, "Resource not found")
    } )
    .catch((err) => erroHandler(res, 400, err)); // TODO separate between 500- & 400- errors
});


function erroHandler(res, status, err) {
  res.status(status).json({
    errors: [
      {
        status: status,
        details: err.message || err,
      },
    ],
  });
}

module.exports = router;
