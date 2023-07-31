import express from 'express';
const router = express.Router();
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';

// Create a post
router.post('/', async (req, res) => {
  try {
    const { title, author, content, tags } = req.body;

    const blog = new Blog({
      title,
      author,
      content,
      tags,
    });

    await blog.save();

    res.status(201).json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Edit Post by ID
router.put('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { content, title, tags } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Content is required for edit' });
    }

    const updateFields = {};
    if (content) {
      updateFields.content = content;
    }
    if (title) {
      updateFields.title = title;
    }
    if (tags) {
      updateFields.tags = tags;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    if (updatedBlog) {
      console.log(`${id}'s content changed successfully`);
      res.send(updatedBlog.toObject());
    } else {
      res.status(404).send('Blog not found');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    // Fetch comments for each post
    const blogsWithComments = await Promise.all(
      blogs.map(async (blog) => {
        const comments = await Comment.find({ blogId: blog._id });
        return { ...blog.toObject(), comments };
      })
    );

    res.json(blogsWithComments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Search for posts
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;

    const blogs = await Blog.find({ $text: { $search: query } });

    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const comments = await Comment.find({ blogId: blog._id });

    res.json({ ...blog.toObject(), comments });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a post by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findOneAndDelete({ _id: id });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const deletedComments = await Comment.deleteMany({ blogId: id });
    const deleteCommentsCount = deletedComments.deletedCount || 0;
    if (deleteCommentsCount > 0) {
      console.log(`Deleted ${deleteCommentsCount} comments for: ${blog.title}`);
    }

    res.json({ message: 'Blog and associated comments deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
