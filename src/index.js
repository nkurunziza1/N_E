import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import "dotenv/config";
import adminSeeder from "./seeders/adminSeeder.js";
import Usersroutes from "./routes/user.routes.js";
import scheduleCollectionRoutes from "./routes/scheduleCollection.routes.js";
import authRoutes from "./routes/auth.routes.js";


import cors from "cors";
const app = express();

const port = process.env.PORT;
const connect = () => {
  mongoose
    .connect(process.env.MONGO_DATABASE)
    .then(() => console.log("connected to db"))
    .then(() => {
      adminSeeder();
      app.use(express.json());
    })
    .catch((err) => {
      throw err;
    });
};

app.use(cors());

app.use(cookieParser());
app.use(express.json());
app.use("/api/v1", authRoutes);
app.use("/api/v1/users", Usersroutes);
app.use("/api/v1", scheduleCollectionRoutes);
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "something went wrong";
  console.log(err);
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(port, () => {
  connect();
  console.log(`app is listening on ${port} `);
});
