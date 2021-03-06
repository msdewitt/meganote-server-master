var router = require('express').Router();
var Note = require('../models/note');

// READ all notes
router.get('/', function(req, res) {
  res.json(req.user.notes);
});

// READ one note
router.get('/:id', function(req, res) {
  res.json(req.user.notes.id(req.params.id));
});

// CREATE a note
router.post('/', function(req, res) {
  req.user.notes.push({
    title: req.body.note.title,
    body_html: req.body.note.body_html
  });

  req.user
    .save()
    .then(function(userData) {
      res.json({
        message: 'Successfully created note',
        note: userData.notes[userData.notes.length-1];
      });
    });
});

// UPDATE a note
router.put('/:id', function(req, res) {
  var note = req.user.notes.id(req.params.id);
  note.title = req.body.note.title;
  note.body_html = req.body.note.body_html;

  req.user
    .save()
    .then(
      user => {
        res.json({
          message: 'Your changes have been saved.',
          note: note
        });
      }
    )

    .then(
      function(note) {
        note
          .save()
          .then(
            function() {
              res.json({
                message: 'Your changes have been saved.',
                note: note
              });
            },
            function(result) {
              res.json({ message: 'Aww, cuss!' });
            }
          );
      },
      function(result) {
        res.json({ message: 'Aww, cuss!' });
      });
});

// DELETE a note
router.delete('/:id', function(req, res) {
    var note = req.user.notes.id(req.params.id);
    note.remove();
    note.save()
        .then(
          function() {
            res.json({
              message: 'Your changes have been saved.',
              note: note
            });
          });
});

module.exports = router;
