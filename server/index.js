import express from "express";
import bodyParser from "body-parser";
import connection from "./db/index.js";
import cors from "cors";
import { config } from "dotenv";
import userRouter from "./Routes/userRoutes.js";
import bookRouter from "./Routes/bookRoutes.js";
import userDetailRouter from "./Routes/userDetailRouter.js";
import { authenticateRoute } from "./Utils/Utils.js";

config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    exposedHeaders: ["Authorization"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", userRouter);

app.use(authenticateRoute);
app.use("/user/details", userDetailRouter);
app.use("/books", bookRouter);
connection
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
      console.log("Connected to mongodb");
    });
  })
  .catch((err) => {
    console.log(err);
  });
