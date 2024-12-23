const Task = require("../models/todo.model");
const customError = require("../utils/customError");

const createTask = async (req, res, next) => {
    const { task, priority, date, isCompleted } = req.body;

    try {
        if (!task) {
            return next(customError(403, "Please enter a title"));
        }

        const newTask = new Task({
            task,
            priority,
            date,
            isCompleted,
        });

        await newTask.save();

        res.status(200).json(newTask);
    } catch (err) {
        return next(customError(500, err.message));
    }
};

const getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find();

        res.status(200).json(tasks);
    } catch (err) {
        next(customError(500, err.message));
    }
};

const updateTasks = async (req, res, next) => {
    const { task_id, task, priority, date, isCompleted } = req.body;

    try {
        const newTask = await Task.findOneAndUpdate(
            { _id: task_id },
            {
                $set: {
                    task,
                    priority,
                    date,
                    isCompleted,
                },
            },
            {
                new: true,
            }
        );

        res.status(200).json(newTask);
    } catch (err) {
        next(customError(500, err.message));
    }
};
const deleteTasks = async (req, res, next) => {
    const { id } = req.params;

    try {
        await Task.findOneAndDelete({ _id: id });

        res.status(200).json({
            mesasge: "Task deleted successfully",
        });
    } catch (err) {
        next(customError(500, err.message));
    }
};
const isCompleted = async (req, res, next) => {
    const taskId = req.params.id;

    try {
        // Find the task by ID
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Toggle the isCompleted property
        task.isCompleted = !task.isCompleted;
        await task.save();

        // Respond with the updated task
        res.status(200).json({ message: "Task completed successfully", task });
    } catch (err) {
        next(customError(500, err.message));
    }
};

module.exports = {
    createTask,
    getTasks,
    updateTasks,
    deleteTasks,
    isCompleted,
};
