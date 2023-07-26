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

router.put('/edit/:title', async (req, res) => {
  try {
    // Decode the URL-encoded title
    let { title } = req.params;
    title = decodeURIComponent(title);

    const contentMod = req.body.content;

    const updatedBlog = await Blog.findOneAndUpdate(
      { title },
      { $set: { content: contentMod } },
      { new: true }
    );
    if (updatedBlog) {
      console.log(`${title}\'s content changed successfully`);
      res.send(updatedBlog.toObject());
    } else {
      res.status(404).send('Task not found');
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

// Get posts by tag
router.get('/tags/:tag', async (req, res) => {
  try {
    const { tag } = req.params;

    const blogs = await Blog.find({ tags: tag });

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

// Delete a post by title
router.delete('/:title', async (req, res) => {
  try {
    // Decode the URL-encoded title
    let { title } = req.params;
    title = decodeURIComponent(title);

    const blog = await Blog.findOneAndDelete({ title });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const deletedComments = await Comment.deleteMany({ blogId: blog._id });
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
