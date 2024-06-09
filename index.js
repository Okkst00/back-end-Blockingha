// const express = require("express");
// const fs = require("fs");
// const db = require("./db");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const app = express();
// const port = 4000;

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

// // Load data from JSON file
// // const data = JSON.parse(fs.readFileSync("data.json"));

// // Middleware untuk menambahkan headers CORS
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });

// // Route untuk menampilkan semua data
// // app.get("/data", (req, res) => {
// //   res.json(data);
// // });

// app.use(bodyParser.json());

// // Endpoint untuk membuat task
// app.post("/tasks", (req, res) => {
//   const { date, time, do: taskDo, status, doing_time, note, late } = req.body;
//   const sql =
//     "INSERT INTO tasks (date, time, do, status, doing_time, note, late) VALUES (?, ?, ?, ?, ?, ?, ?)";
//   const values = [date, time, taskDo, status, doing_time, note, late];

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.status(201).json({ id: result.insertId });
//   });
// });

// // READ ALL
// app.get("/tasks", (req, res) => {
//   db.query("SELECT * FROM tasks", (err, results) => {
//     if (err) {
//       console.error("Error fetching tasks:", err);
//       res.status(500).send("Error fetching tasks");
//       return;
//     }
//     res.status(200).json(results);
//   });
// });

// // READ BY ID
// app.get("/tasks/:id", (req, res) => {
//   const { id } = req.params;
//   db.query("SELECT * FROM tasks WHERE id = ?", [id], (err, results) => {
//     if (err) {
//       console.error("Error fetching task:", err);
//       res.status(500).send("Error fetching task");
//       return;
//     }
//     if (results.length === 0) {
//       res.status(404).send("Task not found");
//       return;
//     }
//     res.status(200).json(results[0]);
//   });
// });

// // UPDATE
// app.put("/tasks/:id", (req, res) => {
//   const { id } = req.params;
//   const { date, time, do: task, status, doing_time, note, late } = req.body;
//   const query =
//     "UPDATE tasks SET date = ?, time = ?, do = ?, status = ?, doing_time = ?, note = ?, late = ? WHERE id = ?";

//   db.query(
//     query,
//     [date, time, task, status, doing_time, note, late, id],
//     (err, result) => {
//       if (err) {
//         console.error("Error updating task:", err);
//         res.status(500).send("Error updating task");
//         return;
//       }
//       if (result.affectedRows === 0) {
//         res.status(404).send("Task not found");
//         return;
//       }
//       res.status(200).send("Task updated successfully");
//     }
//   );
// });

// // DELETE
// app.delete("/tasks/:id", (req, res) => {
//   const { id } = req.params;
//   const query = "DELETE FROM tasks WHERE id = ?";

//   db.query(query, [id], (err, result) => {
//     if (err) {
//       console.error("Error deleting task:", err);
//       res.status(500).send("Error deleting task");
//       return;
//     }
//     if (result.affectedRows === 0) {
//       res.status(404).send("Task not found");
//       return;
//     }
//     res.status(200).send("Task deleted successfully");
//   });
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
