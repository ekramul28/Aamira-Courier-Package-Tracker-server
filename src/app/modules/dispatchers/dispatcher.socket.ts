import { Server, Socket } from 'socket.io';

export const registerDispatcherSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    // Listen for dispatcher dashboard events
    socket.on('join-dispatcher', () => {
      // Join dispatcher room or similar logic
    });
  });
};
