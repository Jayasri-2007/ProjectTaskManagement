
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/taskmanager")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "InProgress", "Completed"],
    default: "Pending"
  }
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

app.get("/tasks", async (req, res) => {
  try {
    res.json(await Task.find());
  } catch (err) {
    res.status(500).json({ message: "Could not fetch tasks" });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const task = await Task.create({ title: req.body.title });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: "Could not create task" });
  }
});

app.patch("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: "Could not update task" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Could not delete task" });
  }
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
