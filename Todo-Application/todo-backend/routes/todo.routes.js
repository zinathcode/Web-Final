const express = require("express");
const {
    createTask,
    getTasks,
    updateTasks,
    deleteTasks,
    isCompleted,
} = require("../controllers/todo.controller");

const route = express.Router();

route.post("/create", createTask);
route.get("/getall", getTasks);
route.patch("/update", updateTasks);
route.delete("/delete/:id", deleteTasks);
route.patch("/complete/:id", isCompleted);

module.exports = route;
