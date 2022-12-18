require("dotenv").config();
const logger = require("./util/logger");

const amqp = require("amqplib/callback_api");
const postHospital = require("./services/hospital-service");
const createError = require("http-errors");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const uuid = require("node-uuid");
const md5 = require("md5");
const path = require("path");
const os = require("os");

var bodyParser = require("body-parser");
var multer = require("multer");
var upload = multer();

module.exports = async () => {
  require("./util/database-connection");

  await require("./migration")
    .run()
    .then(() => {
      logger.info("Database migration completed");
    })
    .catch((error) => {
      logger.error("Error while migrating database", error);
      // eslint-disable-next-line no-console
      console.error(error);
      process.exit(1);
    });
    amqp.connect("amqp://localhost", function (error0, connection) {
      if (error0) {
        throw error0;
      }
      connection.createChannel(function (error1, channel) {
        if (error1) {
          throw error1;
        }
        var queue = "hospital";
        channel.assertQueue(queue, {
          durable: false,
        });
        console.log(
          " [*] Waiting for messages in %s. To exit press CTRL+C",
          queue
        );
        channel.consume(
          queue,
          function (msg) {
            //convert message to json
            var data = JSON.parse(msg.content);
            data.password = ""
            postHospital.postAdmin(data);
          },
          {
            noAck: true,
          }
        );
      });
    });

  const { ErrorCodes } = require("./model/base-response");
  const { SERVICE_NAME } = require("./util/constants");
  const routes = require("./routes");

  const app = express();
  app.use(cors());

  app.use(function (req, res, next) {
    req.user = null;
    next();
  });

  const http = require("http");
  const server = http.createServer(app);

  const notFoundHandler = function (req, res, next) {
    next(createError(404));
  };

  morgan.token("id", function getId(req) {
    return req.id;
  });

  morgan.token("traceId", function getId(req) {
    return req.traceId;
  });

  morgan.token("logId", function getId(req) {
    return req.logId;
  });

  morgan.token("userId", function getId(req) {
    return req.headers["user.id"];
  });

  morgan.token("userType", function getId(req) {
    return req.headers["user.type"];
  });

  morgan.token("timestamp", function getId() {
    return new Date().toISOString();
  });

  app.use((req, res, next) => {
    req.id = md5(uuid.v4());
    req.traceId = req.header("eg-request-id") || "-";
    req.logId = [
      SERVICE_NAME,
      `traceId[${req.traceId}]`,
      `spanId[${req.id}]`,
      `user[${
        req.header("user.id")
          ? req.header("user.id") + "," + req.header("user.type")
          : "-"
      }]`,
    ].join(" ");
    req.log = (...args) => {
      logger.info([new Date().toISOString(), req.logId, ...args].join(" "));
    };
    req.error = (...args) => {
      logger.error([new Date().toISOString(), req.logId, ...args].join(" "));
    };
    next();
  });

  app.use(
    morgan(
      `:timestamp ${SERVICE_NAME} traceId[:traceId] spanId[:id] user[:userId] :method :url :status :response-time ms`,
      { stream: logger.stream }
    )
  );
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(upload.array("file"));
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "ejs");

  routes.configure(app);

  if ("production" === process.env.NODE_ENV) {
    app.use("/hospital-user/api/v1/api-docs", notFoundHandler);
  } else {
    logger.info(
      `Swagger link: http://localhost:${process.env.PORT}/hospital-user/api/v1/api-docs `
    );
  }

  app.use(
    "/hospital-user/api/v1/",
    express.static(path.join(__dirname, "public"))
  );

  // app.use('/', validateAuth0JWT);

  // catch 404 and forward to error handler
  app.use(notFoundHandler);

  // error handler
  // eslint-disable-next-line no-unused-vars
  app.use(function (error, req, res, next) {
    if (req.error) {
      req.error(`error handler: :${JSON.stringify(error)}, obj: ${error}`);
    } else {
      logger.error(
        `${new Date().toISOString()} ${
          req.logId
        } error handler: :${JSON.stringify(error)}, obj: ${error}`
      );
    }
    if (error && 404 !== error.status) {
      // eslint-disable-next-line no-console
      console.error(new Date().toISOString(), req.logId, error);
    }
    if (res.headersSent) {
      return;
    }
    if (error.message && error.message.includes("invalid input syntax")) {
      error = { ...ErrorCodes.BAD_REQUEST, errorDescription: error.message };
    }
    res.status(error.status || 500);
    if (error.errorDescription) {
      error.errorDescription = error.errorDescription.trim();
    }
    res.send({
      errors: [{ code: error.code, message: error.message }],
      errorDescription: error.errorDescription,
      meta: error.meta,
    });
  });

  return { app, server };
};
