import { connect } from "mongoose";
import { DB_URI } from ".";

const dbConnect = async () => {
  try {
    await connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Database connected successfully.");
  } catch (err) {
    console.log(`Mongoose connection was not succesful due to: ${err}`);
  }
};

export default dbConnect;
