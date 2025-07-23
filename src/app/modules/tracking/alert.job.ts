import { getLatestPackageStates } from './tracking.service';
import { Notification } from '../Notification/notification.model';
import { Server } from 'socket.io';
import { User } from '../User/user.model';

export const startStuckPackageAlertJob = (io: Server) => {
  setInterval(
    async () => {
      const packages = await getLatestPackageStates();
      const now = new Date();
      for (const pkg of packages) {
        // Only check active packages
        if (['DELIVERED', 'CANCELLED'].includes(pkg.status)) continue;
        // If last update > 30 minutes ago
        if (
          now.getTime() - new Date(pkg.timestamp).getTime() >
          30 * 60 * 1000
        ) {
          // Check if a notification already exists for this package and timestamp
          const exists = await Notification.findOne({
            message: { $regex: pkg.packageId },
            createdAt: { $gte: new Date(now.getTime() - 35 * 60 * 1000) },
          });
          if (!exists) {
            // Find all dispatchers
            const dispatchers = await User.find({ role: 'dispatcher' });
            for (const dispatcher of dispatchers) {
              await Notification.create({
                user: dispatcher._id,
                message: `Package ${pkg.packageId} is stuck in status ${pkg.status} since ${pkg.timestamp}`,
                read: false,
              });
              io.to(dispatcher._id.toString()).emit('notification', {
                user: dispatcher._id,
                message: `Package ${pkg.packageId} is stuck in status ${pkg.status} since ${pkg.timestamp}`,
                read: false,
              });
            }
          }
        }
      }
    },
    5 * 60 * 1000,
  );
};
