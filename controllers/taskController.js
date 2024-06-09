const db = require("../models/db");
const data = require("../data/data.json");

exports.getData = (req, res) => {
  res.json(data);
};

exports.createTask = (req, res) => {
  const { date, time, do: taskDo, status, doing_time, note, late } = req.body;
  const sql =
    "INSERT INTO tasks (date, time, do, status, doing_time, note, late) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [date, time, taskDo, status, doing_time, note, late];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId });
  });
};

exports.getAllTasks = (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) {
      console.error("Error fetching tasks:", err);
      res.status(500).send("Error fetching tasks");
      return;
    }
    res.status(200).json(results);
  });
};

exports.getTaskById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM tasks WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Error fetching task:", err);
      res.status(500).send("Error fetching task");
      return;
    }
    if (results.length === 0) {
      res.status(404).send("Task not found");
      return;
    }
    res.status(200).json(results[0]);
  });
};

exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { date, time, do: task, status, doing_time, note, late } = req.body;
  const query =
    "UPDATE tasks SET date = ?, time = ?, do = ?, status = ?, doing_time = ?, note = ?, late = ? WHERE id = ?";

  db.query(
    query,
    [date, time, task, status, doing_time, note, late, id],
    (err, result) => {
      if (err) {
        console.error("Error updating task:", err);
        res.status(500).send("Error updating task");
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).send("Task not found");
        return;
      }
      res.status(200).send("Task updated successfully");
    }
  );
};

exports.deleteTask = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM tasks WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting task:", err);
      res.status(500).send("Error deleting task");
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send("Task not found");
      return;
    }
    res.status(200).send("Task deleted successfully");
  });
};
