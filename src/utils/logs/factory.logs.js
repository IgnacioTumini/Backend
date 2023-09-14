import env from "../../config/enviroment.config.js";

async function importLogger() {
  let loggers;
  switch (env.loggerLevel) {
    case "info":
      loggers = await import("./loggerProd.js");

      break;

    case "debug":
      loggers = await import("./loggerDev.js");

      break;

    default:
      throw new Error("No digitaste un level correcto");
  }
  return loggers;
}

export default importLogger;
