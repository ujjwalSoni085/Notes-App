const express = require('express');
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');
const auth = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(auth);

// @route   GET /api/notes
// @desc    Get all notes for the logged-in user
// @access  Private
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id }).sort({ updatedAt: -1 });
    res.json(notes);
  } catch (error) {
    console.error('Get notes error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/notes
// @desc    Create a new note
// @access  Private
router.post(
  '/',
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('body').trim().notEmpty().withMessage('Body is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: errors.array().map((err) => err.msg),
        });
      }

      const { title, body: noteBody } = req.body;

      const note = await Note.create({
        title,
        body: noteBody,
        userId: req.user.id,
      });

      res.status(201).json(note);
    } catch (error) {
      console.error('Create note error:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   PUT /api/notes/:id
// @desc    Update a note
// @access  Private
router.put(
  '/:id',
  [
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
    body('body').optional().trim().notEmpty().withMessage('Body cannot be empty'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: errors.array().map((err) => err.msg),
        });
      }

      // Find note and verify ownership
      const note = await Note.findById(req.params.id);

      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }

      if (note.userId.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized to update this note' });
      }

      // Update fields
      const { title, body: noteBody } = req.body;
      if (title) note.title = title;
      if (noteBody) note.body = noteBody;

      const updatedNote = await note.save();
      res.json(updatedNote);
    } catch (error) {
      if (error.kind === 'ObjectId') {
        return res.status(404).json({ message: 'Note not found' });
      }
      console.error('Update note error:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   DELETE /api/notes/:id
// @desc    Delete a note
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (note.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this note' });
    }

    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Note not found' });
    }
    console.error('Delete note error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
