import * as express from "express";
import * as path from "path";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as http from "http";
import * as socketio from "socket.io";
import MySocketIO from "./socket/socketio";
import { Response, Request, NextFunction } from "express-serve-static-core";

const index = require("./routes/index");
const users = require("./routes/users");
// const logger = require("log");


const app = express();

const server = new http.Server(app);
const io = socketio(server);
new MySocketIO(io);

server.listen(process.env.SOCKET_PORT);

// app.use(function (req, res, next) {
//   res.io = io;
//   next();
// });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/", index);
app.use("/users", users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error("Not Found");
  (<any>err).status = 404;
  next(err);
});

// error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status((<any>err).status || 500);
  res.render("error");
});

module.exports = app;
