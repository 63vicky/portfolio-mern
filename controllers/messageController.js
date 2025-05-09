import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/error.js';
import { Message } from '../models/messageSchema.js';

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  const { senderName, subject, message } = req.body;

  if (!senderName || !subject || !message) {
    return next(new ErrorHandler('Please fill full form', 400));
  }

  const data = await Message.create({
    senderName,
    subject,
    message,
  });

  res.status(200).json({
    success: true,
    message: 'Message sent successfully',
    data,
  });
});

export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
  const messages = await Message.find();

  res.status(200).json({
    success: true,
    messages,
  });
});

export const getUnreadCount = catchAsyncErrors(async (req, res, next) => {
  const count = await Message.countDocuments({ isRead: false });

  res.status(200).json({
    success: true,
    unreadCount: count,
  });
});

export const markAllAsRead = catchAsyncErrors(async (req, res, next) => {
  await Message.updateMany({}, { isRead: true });

  res.status(200).json({
    success: true,
    message: 'All messages marked as read',
  });
});

export const deleteMessage = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const message = await Message.findById(id);
  if (!message) {
    return next(new ErrorHandler('Message Already Deleted!', 404));
  }
  await message.deleteOne();
  res.status(200).json({
    success: true,
    message: 'Message deleted',
  });
});
