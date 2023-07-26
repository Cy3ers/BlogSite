import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import BlogList from './components/BlogList';
import Search from './components/Search';
import TaggedBlogs from './components/TaggedBlogs';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/blogs">Blogs</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/blogs" element={<BlogList />} />
          <Route exact path="/search" element={<Search />} />
          <Route path="/tags/:tag" element={<TaggedBlogs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
