const prisma = require('../config/db');
const AppError = require('../utils/AppError');
const { generateUniqueSlug } = require('../utils/generateSlug');

async function slugExists(slug, excludeId) {
  const found = await prisma.blog.findUnique({ where: { slug } });
  return Boolean(found && found.id !== excludeId);
}

// Public listing only ever returns published posts
async function listPublishedBlogs({ page, limit }) {
  const skip = (page - 1) * limit;
  const where = { published: true };
  const [items, total] = await Promise.all([
    prisma.blog.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
    prisma.blog.count({ where }),
  ]);
  return { items, total, page, totalPages: Math.max(1, Math.ceil(total / limit)) };
}

// Admin listing returns everything, published or not
async function listAllBlogs({ page, limit }) {
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    prisma.blog.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' } }),
    prisma.blog.count(),
  ]);
  return { items, total, page, totalPages: Math.max(1, Math.ceil(total / limit)) };
}

async function getPublishedBlogBySlug(slug) {
  const blog = await prisma.blog.findUnique({ where: { slug } });
  if (!blog || !blog.published) throw new AppError('Blog post not found', 404);
  return blog;
}

async function createBlog(data) {
  const slug = await generateUniqueSlug(data.title, slugExists);
  return prisma.blog.create({ data: { ...data, slug } });
}

async function updateBlog(id, data) {
  const existing = await prisma.blog.findUnique({ where: { id } });
  if (!existing) throw new AppError('Blog post not found', 404);

  let slug = existing.slug;
  if (data.title && data.title !== existing.title) {
    slug = await generateUniqueSlug(data.title, slugExists, id);
  }

  return prisma.blog.update({ where: { id }, data: { ...data, slug } });
}

async function deleteBlog(id) {
  const existing = await prisma.blog.findUnique({ where: { id } });
  if (!existing) throw new AppError('Blog post not found', 404);
  await prisma.blog.delete({ where: { id } });
}

module.exports = {
  listPublishedBlogs,
  listAllBlogs,
  getPublishedBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
};
