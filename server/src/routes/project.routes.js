const express = require('express');
const projectController = require('../controllers/project.controller');
const { requireAuth } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validate.middleware');
const { publicLimiter } = require('../middleware/rateLimit.middleware');
const {
  projectSchema,
  projectUpdateSchema,
  paginationSchema,
} = require('../utils/schemas');

const router = express.Router();

router.get('/', publicLimiter, validate({ query: paginationSchema }), projectController.listProjects);
router.get('/:slug', publicLimiter, projectController.getProject);
router.post('/', requireAuth, validate({ body: projectSchema }), projectController.createProject);
router.put('/:id', requireAuth, validate({ body: projectUpdateSchema }), projectController.updateProject);
router.delete('/:id', requireAuth, projectController.deleteProject);

module.exports = router;
