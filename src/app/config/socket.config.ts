import { Server as IOServer, Socket } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { registerNotificationSocket } from '../modules/Notification/notification.socket';
import { registerEventSocket } from '../modules/event/event.sockets';
import { registerTrackingSocket } from '../modules/tracking/tracking.sockets';
// import { socketAuthMiddleware } from '../modules/Auth/auth.socket'; // Uncomment if you add socket auth

// Socket.IO server options can be customized here
const socketOptions = {
  cors: {
    origin: '*', // Adjust as needed for production
    methods: ['GET', 'POST'],
  },
};

/**
 * Initializes the Socket.IO server and sets up event handlers from all modules.
 * @param httpServer - The HTTP server instance to bind Socket.IO to.
 * @returns The initialized Socket.IO server instance.
 */
export function initSocketServer(httpServer: HTTPServer): IOServer {
  const io = new IOServer(httpServer, socketOptions);

  // Optionally add authentication middleware
  // io.use(socketAuthMiddleware);

  // Register all module socket handlers
  registerNotificationSocket(io);
  registerEventSocket(io);
  registerTrackingSocket(io);

  io.on('connection', (socket: Socket) => {
    console.log(`Socket connected: ${socket.id}`);
    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  return io;
}
