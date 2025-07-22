import { Server, Socket } from 'socket.io';
import { EVENT_TYPES } from './event.constant';

export const registerEventSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    socket.on(EVENT_TYPES.PACKAGE_UPDATE, (eventData) => {
      // Broadcast the event to all clients
      io.emit(EVENT_TYPES.PACKAGE_UPDATE, eventData);
    });
  });
};
