// src/socket.ts
import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { registerPackageSocket } from './app/modules/packages/package.socket';
import jwt from 'jsonwebtoken';
import config from './app/config';
import { User } from './app/modules/User/user.model';

let io: SocketIOServer;

export const initSocket = (server: HTTPServer) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: '*', // You can restrict this in production
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', async (socket) => {
    try {
      // Get token from handshake
      const token =
        socket.handshake.auth?.token || socket.handshake.query?.token;
      if (!token) {
        socket.disconnect();
        return;
      }
      console.log(token);
      // Verify token
      const decoded = jwt.verify(token, config.jwt_access_secret as string) as {
        userId: string;
      };
      console.log(decoded);
      const userId = decoded.userId;

      // Optionally, check if user exists in DB
      const user = await User.isUserExistsByCustomId(userId);
      if (!user) {
        socket.disconnect();
        return;
      }

      // Join a room named after the user id
      socket.join(userId);

      // Now you can emit to this user using io.to(userId).emit(...)
      console.log(`User ${userId} connected with socket id ${socket.id}`);

      // package socket registration
      registerPackageSocket(io);
      // Listen for example event
      socket.on('locationUpdate', (data) => {
        console.log('📍 Location Update:', data);

        // Emit to dispatcher or other clients
        io.emit('locationBroadcast', data);
      });

      socket.on('disconnect', () => {
        console.log(`❌ Client disconnected: ${socket.id}`);
      });
    } catch (err) {
      socket.disconnect();
    }
  });

  return io;
};

export const getIO = (): SocketIOServer => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};
