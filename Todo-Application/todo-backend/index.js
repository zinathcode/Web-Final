const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const todoRouter = require("./routes/todo.routes");
const globalError = require("./middleware/globalError.middleware");

dotenv.config();

app.use(cors());

app.use(
    express.json(),
    express.urlencoded({
        extended: true,
    })
);
// health route
app.get("/health", function (req, res) {
    res.status(200).json({
        succes: true,
        message: "Hello from todo backend",
    });
});

app.use("/api", todoRouter);

// handle global error

app.use(globalError);

// connect to DB and run the server

const port = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URL)
    .then((connection) => {
        console.log("DB connection established");
        app.listen(port, () => {
            console.log(`Server listening at port ${port}`);
        });
    })
    .catch((er) => {
        console.log("Connection Error Occured");
    });
