import express from 'express';

import { isAuthenticated } from '../middlewares/auth.js';
import {
  addNewProject,
  deleteProject,
  updateProject,
  getAllProjects,
  getSingleProject,
} from '../controllers/projectController.js';

const router = express.Router();

router.get('/getall', getAllProjects);
router.get('/get/:id', getSingleProject);
router.post('/add', isAuthenticated, addNewProject);
router.put('/update/:id', isAuthenticated, updateProject);
router.delete('/delete/:id', isAuthenticated, deleteProject);

export default router;
