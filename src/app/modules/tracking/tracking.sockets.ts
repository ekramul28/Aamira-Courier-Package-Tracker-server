import { Server, Socket } from 'socket.io';
import { TRACKING_EVENTS } from './tracking.constant';

export const registerTrackingSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    socket.on(TRACKING_EVENTS.LOCATION_UPDATE, (trackingData) => {
      // Broadcast the update to all clients
      io.emit(TRACKING_EVENTS.LOCATION_UPDATE, trackingData);
    });
  });
};
