import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home.jsx';
import BlogList from './components/BlogList.jsx';
import Search from './components/Search.jsx';
import TaggedBlogs from './components/TaggedBlogs.jsx';
import AddBlog from './components/AddBlog.jsx';
import './styles/App.css';
import './styles/Home.css';
import './styles/Search.css';
import './styles/AddBlog.css';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-home">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-blogs">
              <Link to="/blogs">Blogs</Link>
            </li>
            <li className="nav-search">
              <Link to="/search">Search</Link>
            </li>
            <li className="nav-add">
              <Link to="/addBlog">New Blog</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/blogs" element={<BlogList />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/addBlog" element={<AddBlog />} />
          <Route path="/tags/:tag" element={<TaggedBlogs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
