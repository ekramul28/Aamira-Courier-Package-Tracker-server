import { Socket, Server } from 'socket.io';
import { Notification } from './notification.model';

export const registerNotificationSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    // Listen for a client sending a notification to a user
    socket.on('send-notification', async (data) => {
      // data: { userId: string, message: string }
      if (!data?.userId || !data?.message) return;
      // Save notification to DB
      const notification = await Notification.create({
        user: data.userId,
        message: data.message,
        read: false,
      });
      // Emit notification to the target user (room = userId)
      io.to(data.userId).emit('notification', notification);
    });

    // Listen for marking a notification as read
    socket.on('mark-as-read', async (data) => {
      // data: { notificationId: string }
      if (!data?.notificationId) return;
      await Notification.findByIdAndUpdate(data.notificationId, { read: true });
    });

    // Optionally, join the user to a room with their userId for targeted notifications
    socket.on('identify', (userId: string) => {
      if (userId) {
        socket.join(userId);
      }
    });
  });
};
