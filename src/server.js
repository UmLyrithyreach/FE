const express = require("express");
const cors = require("cors");
app.use(cors());
const sql = require("mssql");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: { encrypt: true, trustServerCertificate: true },
};

// Get tasks
app.get("/tasks", async (req, res) => {
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request().query("SELECT * FROM Tasks");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Add a task
app.post("/mydb", async (req, res) => {
  const { task } = req.body;
  const newTask = await db.insertTask(task); // Ensure this function inserts and returns the task with ID
  res.json(newTask); // Send the new task back
});


// Delete a task
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let pool = await sql.connect(dbConfig);
    await pool.request().query(`DELETE FROM Tasks WHERE id = ${id}`);
    res.status(200).send("Task deleted");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
