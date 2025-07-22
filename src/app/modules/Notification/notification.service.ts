import { Notification } from './notification.model';
import { Server } from 'socket.io';

export const sendNotification = async (
  io: Server,
  userId: string,
  message: string,
) => {
  // Save notification to DB
  const notification = await Notification.create({ user: userId, message });
  // Emit notification to user via Socket.IO
  io.to(userId).emit('notification', notification);
  return notification;
};

export const getUserNotifications = async (userId: string) => {
  return Notification.find({ user: userId }).sort({ createdAt: -1 });
};
