import * as mongoose from "mongoose";
import Messages, { IMessages } from "../models/Messages";
import User, { IUser } from "../models/User";

interface IConnectOptions {
  autoReconnect: boolean;
  reconnectTries: number; // Never stop trying to reconnect
  reconnectInterval: number;
  loggerLevel?: string;
  useNewUrlParser?: boolean;
}

const connectOptions: IConnectOptions = {
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000,
  useNewUrlParser: true
};

const MONGO_URI: string = `mongodb://${process.env.DB_HOST}:${
  process.env.DB_PORT
}/${process.env.DB_DATABASE}`;
console.log(`mongo URI:${MONGO_URI}`);

const db: mongoose.Connection = mongoose.createConnection(
  MONGO_URI,
  connectOptions
);

export default class DbHandler {
  db: mongoose.Connection;
  constructor() {
    this.db = db;
  }
  static async getMessages() {
    return await Messages.find();
  }
  static async storeMessages(data: IMessages) {
    console.log(data);
    const newMessages = new Messages({
      name: data.name,
      msg: data.msg,
      time: new Date().getTime()
    });
    return await newMessages.save();
  }
  static getUsers() {
    return User.find();
  }
  static addUser(data: IUser) {
    console.log(data);
    const newUser = new User({
      name: data.name,
      password: data.password
    });
    return newUser.save();
  }
}

(<any>db).Promise = global.Promise;

// handlers
db.on("connecting", () => {
  console.log("\x1b[32m", "MongoDB :: connecting");
});

db.on("error", error => {
  console.log("\x1b[31m", `MongoDB :: connection ${error}`);
  mongoose.disconnect();
});

db.on("connected", () => {
  console.log("\x1b[32m", "MongoDB :: connected");
});

db.once("open", () => {
  console.log("\x1b[32m", "MongoDB :: connection opened");
});

db.on("reconnected", () => {
  console.log('\x1b[33m"', "MongoDB :: reconnected");
});

db.on("reconnectFailed", () => {
  console.log("\x1b[31m", "MongoDB :: reconnectFailed");
});

db.on("disconnected", () => {
  console.log("\x1b[31m", "MongoDB :: disconnected");
});

db.on("fullsetup", () => {
  console.log('\x1b[33m"', "MongoDB :: reconnecting... %d");
});
