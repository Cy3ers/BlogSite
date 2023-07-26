import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import keys from './backend/config/keys.js';
const { MongoURI: db } = keys;
import blogRoutes from './backend/routes/blogs.js';
import commentRoutes from './backend/routes/comments.js';
import cors from 'cors';

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
app.use(cors());
app.use('/api/posts', blogRoutes);
app.use('/api/comments', commentRoutes);

app.listen(port, (req, res) => {
  console.log(`App running on port: ${port}`);
});
