import * as mongoose from "mongoose";

export interface IUser {
  name: String;
  password: String;
}

const userSchema = new mongoose.Schema<IUser>({
  name: String,
  password: String
});

const User = mongoose.model("user", userSchema);
export default User;
