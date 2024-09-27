import Blog from "../models/blogModel.js"
const express = require('express');
const router = express.Router();

// Show all blog posts
router.get('/', (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) {
            console.error(err);
        } else {
            res.render('index', { blogs: blogs });
        }
    });
});

// Show form to create a new blog
router.get('/new', (req, res) => {
    res.render('blog');
});

// Create a new blog post
router.post('/', (req, res) => {
    const newBlog = {
        title: req.body.title,
        content: req.body.content
    };
    Blog.create(newBlog, (err, blog) => {
        if (err) {
            console.error(err);
        } else {
            res.redirect('/blogs');
        }
    });
});
module.exports = router;