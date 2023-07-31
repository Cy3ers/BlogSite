# Blogging Web App

This app is a blogging web application that allows users to create and publish their own blogs. It uses React for the front-end, Node.js and Express for the back-end, and MongoDB as the database.


## Table of Contents:
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features
- User-friendly interface for reading blogs
- Create, edit, and delete blogs
- Comment on blogs
- Responsive design for mobile and desktop

## Installation

To run the Blogging App locally, follow these steps:

Clone the Repository:
```bash
git clone https://github.com/Cy3ers/BlogSite.git
cd BlogSite
```

Install Dependencies:

```bash
npm install

cd frontend
npm install # For frontend dependencies
```

Start the development server:
```bash
# In the project directory:
npm start

# In a new terminal:
cd frontend
npm start
```
The app should now be running at [http://localhost:3000](http://localhost:3000).

## Usage

Upon launching the app, you will the homepage. It is a basic welcoming page. There is a Nav-bar at the top that can be used to jump to any page you want. Otherwise you can press the 'Explore Blogs' button. That will take you to the page where all of the blogs are displayed with its Author and its relevant tags. Here you can scroll through all the blogs that are on the site. If you click the title on any of the Blogs, it will take you to its full view. Here you can click the 'X' button on the top right to delete the blog, or you can use the edit button to edit the blog. Below the blog are the comments where you can also delete any comment with the 'X' button next to the comment. You can also make a new comment.

You can use the Nav-bar to go to the search feature. Here you can use any keywords and the app will display any blogs relevant to the search if there are any. Again, clicking on any of the blog titles will take you to the full view of that blog.

You can use the Nav-bar's right-most button to Add a new blog.

## Technologies Used
React
> Frontend JavaScript library for building user interfaces.

Node.js
> JavaScript runtime environment used for building server-side applications.

Express.js
> Minimal and flexible Node.js web application framework.

MongoDB
> NoSQL database that stores data in a JSON-like format.

Mongoose
> Object Data Modeling (ODM) library for MongoDB and Node.js.

Bootstrap
> Popular CSS framework for pre-designed and customizable components.

React Icons
> Library for including popular icons in React applications.

## Contributing

Contributions to the Blog Web App are welcome! If you find any issues or have suggestions for improvements, please feel free to submit a pull request or open an issue.
```bash
# - Fork the repository from the main branch.
# - Create a new branch with a descriptive name for your feature or bug fix.
# - Make your changes and commit them with clear commit messages.
# - Push your branch to your forked repository.
# - Submit a pull request to the main repository.
```

## License

The Recipe App is open-source software.
