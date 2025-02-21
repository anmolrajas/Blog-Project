const express = require('express');
const { allBlogs, createBlog } = require('../controller/blogs');
const router = express.Router();

router.get('/list', allBlogs);
router.post('/create', createBlog);

module.exports = router;