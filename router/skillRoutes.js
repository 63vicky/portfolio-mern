import express from 'express';

import { isAuthenticated } from '../middlewares/auth.js';
import {
  addNewSkill,
  deleteSkill,
  getAllSkill,
  updateSkill,
} from '../controllers/skillController.js';

const router = express.Router();

router.get('/getall', getAllSkill);
router.post('/add', isAuthenticated, addNewSkill);
router.put('/update/:id', isAuthenticated, updateSkill);
router.delete('/delete/:id', isAuthenticated, deleteSkill);

export default router;
