import { Server, Socket } from 'socket.io';

export const registerDispatcherSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    socket.on('join-dispatcher', () => {
      // Join dispatcher room or similar logic
    });
  });
};
