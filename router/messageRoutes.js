import express from 'express';
import {
  getAllMessages,
  sendMessage,
  deleteMessage,
  getUnreadCount,
  markAllAsRead,
} from '../controllers/messageController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/send', sendMessage);
router.get('/getall', getAllMessages);
router.get('/unread-count', getUnreadCount);
router.post('/mark-all-read', isAuthenticated, markAllAsRead);
router.delete('/delete/:id', isAuthenticated, deleteMessage);

export default router;
