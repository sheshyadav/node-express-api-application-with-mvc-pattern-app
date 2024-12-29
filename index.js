"use strict";
import express from "express";
import swaggerUi from "swagger-ui-express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

import logger from "./app/services/logger.js";
import routes from "./routes/index.js";
import swaggerOptions from "./config/swagger.js";

/**----- setup the server -----**/
const app = express();
app.use(cors());
app.disable("x-powered-by"); //Reduce fingerprinting
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

/**----- setup the server -----**/

/**----- routes configuration section -----**/
app.use(process.env.API_VERSION, routes);
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerOptions));
/**----- routes configuration section -----**/


/**----- Error handling middleware -----**/
app.use((err, req, res, next) => {
  logger.error(`${err.message}`, { stack: err.stack });
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message
  });
});
/**----- Error handling middleware -----**/


/**----- application start the server -----**/
app.listen(
  process.env.APP_PORT,
  console.log(`Application Server started on url ${process.env.APP_URL}`),
  logger.info(`Application Server started on url ${process.env.APP_URL}`)
);
/**----- application start the server -----**/
