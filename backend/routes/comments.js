import express from 'express';
const router = express.Router();
import Comment from '../models/Comment.js';

// Create a comment
router.post('/', async (req, res) => {
  try {
    const { blogId, content } = req.body;

    const comment = new Comment({
      blogId,
      content,
    });

    await comment.save();

    res.status(201).json(comment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all comments for a post
router.get('/:blogId', async (req, res) => {
  try {
    const { blogId } = req.params;

    const comments = await Comment.find({ blogId });

    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
