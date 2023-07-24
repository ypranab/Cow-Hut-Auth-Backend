import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";
import { Server } from "http";
import { errorLogger, logger } from "./shared/logger";

process.on("uncaughtException", (error) => {
  console.log(error);
  process.exit(1);
});

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("db connected");

    server = app.listen(config.port, () => {
      console.log(`Listening form port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }

  process.on("unhandledRejection", (error) => {
    console.log("unhandled rejection");

    if (server) {
      server.close(() => {
        console.log("unhandled");

        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

process.on("SIGTERM", () => {
  console.log("SIGTERM Receceived");
  if (server) {
    server.close();
  }
});
