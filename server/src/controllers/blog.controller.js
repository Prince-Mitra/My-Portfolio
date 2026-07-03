const blogService = require('../services/blog.service');

async function listBlogs(req, res, next) {
  try {
    const { page, limit } = req.query;
    const data = await blogService.listPublishedBlogs({ page, limit });
    res.json({ success: true, message: 'Blog posts fetched successfully', data });
  } catch (err) {
    next(err);
  }
}

async function listAllBlogsAdmin(req, res, next) {
  try {
    const { page, limit } = req.query;
    const data = await blogService.listAllBlogs({ page, limit });
    res.json({ success: true, message: 'Blog posts fetched successfully', data });
  } catch (err) {
    next(err);
  }
}

async function getBlog(req, res, next) {
  try {
    const blog = await blogService.getPublishedBlogBySlug(req.params.slug);
    res.json({ success: true, message: 'Blog post fetched successfully', data: blog });
  } catch (err) {
    next(err);
  }
}

async function createBlog(req, res, next) {
  try {
    const blog = await blogService.createBlog(req.body);
    res.status(201).json({ success: true, message: 'Blog post created successfully', data: blog });
  } catch (err) {
    next(err);
  }
}

async function updateBlog(req, res, next) {
  try {
    const blog = await blogService.updateBlog(req.params.id, req.body);
    res.json({ success: true, message: 'Blog post updated successfully', data: blog });
  } catch (err) {
    next(err);
  }
}

async function deleteBlog(req, res, next) {
  try {
    await blogService.deleteBlog(req.params.id);
    res.json({ success: true, message: 'Blog post deleted successfully', data: null });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listBlogs,
  listAllBlogsAdmin,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};
