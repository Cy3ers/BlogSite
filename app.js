import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import keys from './config/keys.js';
const { MongoURI: db } = keys;
import blogRoutes from './routes/blogs.js';
import commentRoutes from './routes/comments.js';

dotenv.config();

const app = express();

const port = process.env.PORT || 8080;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected...');
  })
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use('/api/posts', blogRoutes);
app.use('/api/comments', commentRoutes);

app.listen(port, (req, res) => {
  console.log(`App running on port: ${port}`);
});
