const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
    {
        task: {
            type: String,
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "high",
        },
        date: {
            type: Date,
        },
        isCompleted: {
            type: Boolean,
        },
    },
    {
        timestamps: true,
    }
);
const Task = model("Task", taskSchema);
module.exports = Task;
