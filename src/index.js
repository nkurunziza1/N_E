import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js";
import "dotenv/config";
import BlogsRoutes from "./routes/blogs.routes.js";
import NewsRoutes from "./routes/news.routes.js";
import adminSeeder from "./seeders/adminSeeder.js";
import { getPdf } from "./controller/upload.js";
import Applicationroutes from "./routes/careers.routes.js"
import NewsLetterRoutes from "./routes/newsletter.routes.js"
import PortifolioRoutes from "./routes/portifolio.routes.js"
import TestmonialRoutes from "./routes/testmonial.routes.js"

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

app.use("/files", express.static("files"));
app.use(cookieParser());
app.use(express.json());
app.use("/pdf", getPdf);
app.use("/api/v1", authRoutes);
app.use("/api/v1", NewsLetterRoutes);
app.use("/api/v1", PortifolioRoutes);
app.use("/api/v1", Applicationroutes)
app.use("/api/v1", TestmonialRoutes)
app.use("/api/v1", NewsRoutes)
app.use("/api/v1", BlogsRoutes);
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
