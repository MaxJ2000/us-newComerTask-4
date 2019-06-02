import * as mongoose from "mongoose";

export interface IMessages {
  name: String;
  msg: String;
}


const messagesSchema = new mongoose.Schema<IMessages>({
  name: String,
  msg: String,
  time: Number
});

const Messages = mongoose.model("messages", messagesSchema);
export default Messages;
