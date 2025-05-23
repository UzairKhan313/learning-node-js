const express = require("express");
require("dotenv").config();

const taskRoutes = require("./routes/tasks");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static("./public"));
app.use(express.json());

// ROUTES.
app.use("/api/v1/tasks", taskRoutes);
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(
      PORT,
      console.log(`Server is runing on https://localhost:${PORT}`)
    );
  } catch (error) {
    console.log("Faild to connect with database.", error);
  }
};

start();
