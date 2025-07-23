// If you want to use only the WebSocket server, run sockets.ts instead of this file.
// To combine HTTP and WebSocket in one process, you can import and use the WebSocket server from sockets.ts here.
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import http from 'http';
import seedSuperAdmin from './app/DB';
import config from './app/config';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    seedSuperAdmin();
    server = http.createServer(app);
    server.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on('unhandledRejection', (err) => {
  console.log(`😈 unhandled Rejection is detected , shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
