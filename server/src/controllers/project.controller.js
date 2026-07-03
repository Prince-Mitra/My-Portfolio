const projectService = require('../services/project.service');

async function listProjects(req, res, next) {
  try {
    const { page, limit } = req.query;
    const data = await projectService.listProjects({ page, limit });
    res.json({ success: true, message: 'Projects fetched successfully', data });
  } catch (err) {
    next(err);
  }
}

async function getProject(req, res, next) {
  try {
    const project = await projectService.getProjectBySlug(req.params.slug);
    res.json({ success: true, message: 'Project fetched successfully', data: project });
  } catch (err) {
    next(err);
  }
}

async function createProject(req, res, next) {
  try {
    const project = await projectService.createProject(req.body);
    res.status(201).json({ success: true, message: 'Project created successfully', data: project });
  } catch (err) {
    next(err);
  }
}

async function updateProject(req, res, next) {
  try {
    const project = await projectService.updateProject(req.params.id, req.body);
    res.json({ success: true, message: 'Project updated successfully', data: project });
  } catch (err) {
    next(err);
  }
}

async function deleteProject(req, res, next) {
  try {
    await projectService.deleteProject(req.params.id);
    res.json({ success: true, message: 'Project deleted successfully', data: null });
  } catch (err) {
    next(err);
  }
}

module.exports = { listProjects, getProject, createProject, updateProject, deleteProject };
