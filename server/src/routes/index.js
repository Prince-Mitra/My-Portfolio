const express = require('express');
const authRoutes = require('./auth.routes');
const projectRoutes = require('./project.routes');
const blogRoutes = require('./blog.routes');
const contactRoutes = require('./contact.routes');
const uploadRoutes = require('./upload.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/blogs', blogRoutes);
router.use('/contact', contactRoutes);
router.use('/upload', uploadRoutes);

module.exports = router;
