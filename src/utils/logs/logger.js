import winston from "winston";
import env from "../../config/enviroment.config.js";

const { combine, timestamp, printf, colorize } = winston.format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
};
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "blue",
  verbose: "magenta",
  debug: "white",
};

winston.addColors(colors);

export let logger;

switch (env.loggerLevel) {
  case "debug":
    logger = winston.createLogger({
      levels,
      format: combine(
        colorize({ colors: true }),
        timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        myFormat
      ),
      transports: [
        new winston.transports.Console({
          level: env.loggerLevel, // Este nivel se mostrará en la consola
          format: winston.format.colorize({ colors: true }),
        }),
      ],
    });
    break;
  case "info":
    logger = winston.createLogger({
      levels,
      format: combine(
        colorize({ colors: true }),
        timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        myFormat
      ),
      transports: [
        new winston.transports.Console({
          level: env.loggerLevel, // Este nivel se mostrará en la consola
          format: winston.format.colorize({ colors: true }),
        }),
        new winston.transports.File({
          filename: "./errors.log",
          level: "error", // Este nivel se registrará en el archivo
        }),
      ],
    });
    break;

  default:
}
