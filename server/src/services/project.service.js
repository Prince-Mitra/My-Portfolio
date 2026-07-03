const prisma = require('../config/db');
const AppError = require('../utils/AppError');
const { generateUniqueSlug } = require('../utils/generateSlug');

async function slugExists(slug, excludeId) {
  const found = await prisma.project.findUnique({ where: { slug } });
  return Boolean(found && found.id !== excludeId);
}

async function listProjects({ page, limit }) {
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    prisma.project.findMany({
      skip,
      take: limit,
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    }),
    prisma.project.count(),
  ]);

  return { items, total, page, totalPages: Math.max(1, Math.ceil(total / limit)) };
}

async function getProjectBySlug(slug) {
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) throw new AppError('Project not found', 404);
  return project;
}

async function createProject(data) {
  const slug = await generateUniqueSlug(data.title, slugExists);
  return prisma.project.create({ data: { ...data, slug } });
}

async function updateProject(id, data) {
  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) throw new AppError('Project not found', 404);

  let slug = existing.slug;
  if (data.title && data.title !== existing.title) {
    slug = await generateUniqueSlug(data.title, slugExists, id);
  }

  return prisma.project.update({ where: { id }, data: { ...data, slug } });
}

async function deleteProject(id) {
  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) throw new AppError('Project not found', 404);
  await prisma.project.delete({ where: { id } });
}

module.exports = { listProjects, getProjectBySlug, createProject, updateProject, deleteProject };
