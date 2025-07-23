// src/server.ts
import mongoose from 'mongoose';
import http from 'http';
import app from './app';
import config from './app/config';
import seedSuperAdmin from './app/DB';
import { initSocket } from './sockets'; // <-- import here

let server: http.Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    seedSuperAdmin();

    server = http.createServer(app);

    // ✅ Initialize Socket.IO here
    initSocket(server);

    server.listen(config.port, () => {
      console.log(`🚀 App is listening on port ${config.port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

main();

// Shutdown handlers
process.on('unhandledRejection', (err) => {
  console.log(`😈 unhandled Rejection is detected , shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
