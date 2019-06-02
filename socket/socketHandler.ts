import { IMessages } from "../models/Messages";
import DbHandler from "./dbHandler";
import { IUser } from "../models/User";
export default class SocketHandler {
  constructor() {}

  static async getMessages() {
      const messages = await DbHandler.getMessages();
      console.log(messages)
      return messages;
  }

  static async storeMessages(data: IMessages) {
    console.log(data);
      const doc = await DbHandler.storeMessages(data);
    return doc;
  }

  static async getUsers() {
      const users = await DbHandler.getUsers();
      return users;
  }

  static async addUser(user: IUser) {
    console.log(user);
    const doc = await DbHandler.addUser(user);
    return doc;
  }
}
