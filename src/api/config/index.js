require("dotenv").config();
export const DB_URI =
  process.env.DB_URI || "mongodb://127.0.0.1:27017/tete-challenge";
export const PORT = process.env.PORT || "4000";
export const HOST = process.env.HOST || "localhost";
