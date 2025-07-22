// import { Notification } from './notification.model';
import { Server } from 'socket.io';
import { Notification } from './notification.model';

// Send a notification to a user (save to DB and emit via Socket.IO)
export const sendNotification = async (
  io: Server,
  userId: string,
  message: string,
) => {
  // Save notification to DB
  const notification = await Notification.create({
    user: userId,
    message,
    read: false,
  });
  // Emit notification to user via Socket.IO (userId should be a room)
  io.to(userId).emit('notification', notification);
  return notification;
};

// Fetch all notifications for a user
export const getUserNotifications = async (userId: string) => {
  return Notification.find({ user: userId }).sort({ createdAt: -1 });
};

// Mark a notification as read
export const markNotificationAsRead = async (notificationId: string) => {
  return Notification.findByIdAndUpdate(
    notificationId,
    { read: true },
    { new: true },
  );
};
