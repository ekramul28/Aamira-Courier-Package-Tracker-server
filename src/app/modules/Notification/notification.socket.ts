import { Socket, Server } from 'socket.io';
import { sendNotification } from './notification.service';

export const registerNotificationSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    // Listen for notification event from server-side logic
    socket.on('notification', async (data) => {
      // Optionally handle incoming notification events
      // e.g., mark as read, acknowledge, etc.
      // This is a placeholder for future logic
    });
  });
};
