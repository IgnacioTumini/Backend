import winston from "winston";
import env from "../../config/enviroment.config.js";

const levelOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    htto: 4,
    debug: 5,
  },

  colors: {
    fatal: "red",
    error: "orange",
    warning: "yellow",
    info: "blue",
    http: "green",
    debug: "white",
  },
};

const logger = winston.createLogger({
  levels: levelOptions.levels,
  transports: [
    new winston.transports.Console({
      level: env.loggerLevel,
      format: winston.format.combine(
        winston.format.colorize({ colors: levelOptions.colors }),
        winston.format.simple()
      ),
    }),

    new winston.transports.File({
      filename: "./errors.log",
      level: "warning",
      format: winston.format.simple(),
    }),
  ],
});
export const addLogger = (req, res, next) => {
  req.logger = logger;
  req.logger.info(
    `${req.method} en ${req.url} -${new Date().toLocaleTimeString()}`
  );
  req.logger.warning(
    `${req.method} en ${req.url} -${new Date().toLocaleTimeString()}`
  );

  next();
};

/*

// asi se importaria en app, pero es muy robusto

app.use(addLogger)

 

app.get('/',(req,res)=>{

    req.logger.warning("Tenemos una alerta");

    res.send({message: "Estamos probando Logger con Winston"})

})
*/
