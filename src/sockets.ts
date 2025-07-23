import http from 'http';
import { initSocketServer } from './app/config/socket.config';
import app from './app';
// Create HTTP server using the Express app
const server = http.createServer(app);
const socketOptions = {
  cors: {
    origin: '*', // Adjust as needed for production
    methods: ['GET', 'POST'],
  },
};

// Initialize Socket.IO server
const io = initSocketServer(server, socketOptions);

// console.log('this is io222', io);
// Attach io to the app so it can be accessed in routes/controllers
// app.set('io', io);

// Start the server
// const PORT = process.env.SOCKET_PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`WebSocket server running on port ${PORT}`);
// });

// Export io for use in other modules if needed
export { io };
