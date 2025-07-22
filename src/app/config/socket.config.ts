import { Server as IOServer, Socket } from 'socket.io';
import { Server as HTTPServer } from 'http';

// Socket.IO server options can be customized here
const socketOptions = {
  cors: {
    origin: '*', // Adjust as needed for production
    methods: ['GET', 'POST'],
  },
};

/**
 * Initializes the Socket.IO server and sets up event handlers.
 * @param httpServer - The HTTP server instance to bind Socket.IO to.
 * @returns The initialized Socket.IO server instance.
 */
export function initSocketServer(httpServer: HTTPServer): IOServer {
  const io = new IOServer(httpServer, socketOptions);

  io.on('connection', (socket: Socket) => {
    console.log(`Socket connected: ${socket.id}`);
    // Register your event handlers here
    // Example:
    // socket.on('custom-event', (data) => { ... });

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  return io;
}
