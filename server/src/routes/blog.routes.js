const express = require('express');
const blogController = require('../controllers/blog.controller');
const { requireAuth } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validate.middleware');
const { publicLimiter } = require('../middleware/rateLimit.middleware');
const { blogSchema, blogUpdateSchema, paginationSchema } = require('../utils/schemas');

const router = express.Router();

router.get('/', publicLimiter, validate({ query: paginationSchema }), blogController.listBlogs);
router.get('/admin/all', requireAuth, validate({ query: paginationSchema }), blogController.listAllBlogsAdmin);
router.get('/:slug', publicLimiter, blogController.getBlog);
router.post('/', requireAuth, validate({ body: blogSchema }), blogController.createBlog);
router.put('/:id', requireAuth, validate({ body: blogUpdateSchema }), blogController.updateBlog);
router.delete('/:id', requireAuth, blogController.deleteBlog);

module.exports = router;
