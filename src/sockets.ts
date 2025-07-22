import http from 'http';
import { initSocketServer } from './app/config/socket.config';
import app from './app';

// Create HTTP server using the Express app
const server = http.createServer(app);

// Initialize Socket.IO server
const io = initSocketServer(server);

// Start the server
const PORT = process.env.SOCKET_PORT || 5001;
server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});

// Export io for use in other modules if needed
export { io };
