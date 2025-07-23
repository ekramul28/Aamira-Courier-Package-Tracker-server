import { Server as IOServer, Socket, ServerOptions } from 'socket.io';
import { Server as HTTPServer } from 'http';

// import { socketAuthMiddleware } from '../modules/Auth/auth.socket'; // Uncomment if you add socket auth
// Socket.IO server options can be customized here

/**
 * Initializes the Socket.IO server and sets up event handlers from all modules.
 * @param httpServer - The HTTP server instance to bind Socket.IO to.
 * @param socketOptions - Socket.IO server options, including CORS settings.
 * @returns The initialized Socket.IO server instance.
 */
export function initSocketServer(
  httpServer: HTTPServer,
  socketOptions: Partial<ServerOptions>,
): IOServer {
  const io = new IOServer(httpServer, socketOptions);

  // Optionally add authentication middleware
  // io.use(socketAuthMiddleware);

  io.on('connection', (socket: Socket) => {
    console.log(`Socket connected: ${socket.id}`);
    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  return io;
}
