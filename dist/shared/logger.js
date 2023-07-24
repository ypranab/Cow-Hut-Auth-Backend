"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = exports.logger = void 0;
const winston_1 = require("winston");
const { combine, timestamp, label, printf } = winston_1.format;
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const path_1 = __importDefault(require("path"));
const myFormat = printf(({ level, message, label, timestamp }) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${date.toDateString()} ${hours}:${minutes}:${seconds} [${label}] ${level}: ${message}`;
});
const logger = (0, winston_1.createLogger)({
    level: "info",
    format: combine(label({ label: "LSE" }), timestamp(), myFormat
    //prettyPrint()
    ),
    //defaultMeta: { service: 'user-service' },
    transports: [
        new winston_1.transports.Console(),
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(process.cwd(), "logs", "winston", "successes", "lse-%DATE%-success.log"),
            datePattern: "YYYY-MM-DD-HH",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d",
        }),
    ],
});
exports.logger = logger;
const errorLogger = (0, winston_1.createLogger)({
    level: "error",
    format: combine(label({ label: "LSE" }), timestamp(), myFormat),
    defaultMeta: { service: "user-service" },
    transports: [
        new winston_1.transports.Console(),
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(process.cwd(), "logs", "winston", "errors", "lse-%DATE%-error.log"),
            datePattern: "YYYY-MM-DD-HH",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d",
        }),
    ],
});
exports.errorLogger = errorLogger;
if (process.env.NODE_ENV !== "production") {
    logger.add(new winston_1.transports.Console({
        format: winston_1.format.simple(),
    }));
}
