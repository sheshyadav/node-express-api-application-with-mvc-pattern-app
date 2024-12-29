// logger.js
import { createLogger, format, transports } from "winston";
import { resolve } from 'path';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.printf(({ timestamp, level, message, stack }) => {
      return stack
        ? `${timestamp} [${level.toLocaleUpperCase()}]: ${message}\n${stack}`
        : `${timestamp} [${level.toLocaleUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    //new transports.Console(), // Log to the console
    new transports.File({ filename: resolve('storage/logs/error.log'), level: "error" }), // Log to a file
    new transports.File({
      filename: resolve('storage/logs/combined.log'),
      level: "info",
      format: format.combine(
        format((info) => (info.level === 'error' ? false : info))(),
      )
    }) // Log to a file
  ]
});

export default logger;
