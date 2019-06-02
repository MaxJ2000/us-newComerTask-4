import SocketHandler from "./socketHandler";
import { IMessages } from "../models/Messages";
import { IUser } from "../models/User";

export default class MySocketIO {
  io: SocketIO.Server;
  clientsCount: number;
  constructor(io: SocketIO.Server) {
    console.log("SocketIo Start!");
    this.io = io;
    this.clientsCount = 0;
    this.io.on("connection", this.ioOnConnection);
  }
  private async ioOnConnection(socket: SocketIO.Socket) {
    console.log("a user connected");
    this.clientsCount = this.clientsCount++;
    const socketid = socket.id;
    const history = await SocketHandler.getMessages();
    console.log(history);
    this.io.to(socketid).emit("history", history);
    this.io.to(socketid).emit("addClients", {
      clients: this.clientsCount
    });
    socket.on("message", this.socketOnMessage);
    socket.on("removeClients", this.socketOnDisconnect);
    socket.on("addClients", this.socketOnAddClients);
  }
  private socketOnDisconnect(obj: IUser) {
    console.log("a user go out");
    this.clientsCount--;
    this.io.emit("removeClients", {
      clients: this.clientsCount,
      user: obj
    });
  }
  private socketOnMessage(obj: IMessages) {
    SocketHandler.storeMessages(obj);
    this.io.emit("message", obj);
  }
  private socketOnAddClients(obj: IUser) {
    this.clientsCount++;
    this.io.emit("addClients", {
      clients: this.clientsCount,
      user: obj
    });
  }
}
