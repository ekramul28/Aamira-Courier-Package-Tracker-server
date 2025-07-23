import { Server, Socket } from 'socket.io';

export const registerPackageSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    // Listen for package updates and broadcast
    socket.on('package-update', (data) => {
      io.emit('package-update', data);
    });
  });
};
