import { Server, Socket } from 'socket.io';

export const registerCourierSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    socket.on('courier-location-update', (data) => {
      io.emit('courier-location-update', data); // Or restrict to dispatcher rooms
    });
  });
};
