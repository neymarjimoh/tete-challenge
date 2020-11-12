import { transports as _transports, createLogger } from "winston";
import appRoot from "app-root-path";

// define the custom settings for each transport (file, console)
const options = {
  file: {
    level: "error",
    filename: `${appRoot}/src/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: "debug", // use info maybe
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

// Logger configuration
const logConfiguration = {
  exitOnError: false,
  transports: [
    new _transports.Console(options.console),
    new _transports.File(options.file),
  ],
};

// Create the logger
const logger = createLogger(logConfiguration);

logger.stream = {
  // eslint-disable-next-line no-unused-vars
  write: function (message, encoding) {
    logger.info(message);
  },
};

// Export the logger
export default logger;
