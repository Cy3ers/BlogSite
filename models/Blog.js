import mongoose from 'mongoose';

const blogsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },

  tags: [{ type: String }],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

blogsSchema.index({
  title: 'text',
  author: 'text',
  content: 'text',
  tags: 'text',
});

const Blog = mongoose.model('blogs', blogsSchema);

export default Blog;
