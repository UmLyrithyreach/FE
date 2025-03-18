import { useState, useEffect } from "react";
import axios from "axios"; // Import axios to interact with backend
import "./App.css";
import "tailwindcss";
import SearchBox from "./components/SearchBox";
import AppButton from "./components/AppButton";
import SortBtn from "./components/SortBtn";
import DropdownMenu from "./components/DropdownMenu";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");  // Store task input
  const [isInputVisible, setIsInputVisible] = useState(false);  // Track visibility of task input

  // Fetch tasks from SQL Server on component mount
  useEffect(() => {
    axios.get("http://localhost:5000/mydb")
      .then(response => setTasks(response.data))
      .catch(error => console.error("Error fetching tasks:", error));
  }, []);

  // Function to add a task
  const addTask = async () => {
    if (newTask.trim() === "") return; // Don't add empty tasks

    try {
      const response = await axios.post("http://localhost:5000/mydb", { task: newTask });
      setTasks([...tasks, response.data]); // Update state with new task
      setNewTask(""); // Clear the input field
      setIsInputVisible(false); // Hide input field
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Function to delete a task
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/mydb/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId)); // Remove task from UI
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="bg-gray-200 p-5 rounded-lg">
      <h1 className="text-black font-bold my-5">Chlart Task Manager</h1>
      <div className="flex flex-col gap-5 items-center">
        <SearchBox />
        <div className="flex justify-center gap-5">
          {/* Add new task button */}
          <AppButton label="Add new task" onClick={() => setIsInputVisible(true)} />

          {/* Sort button */}
          <SortBtn />
        </div>
      </div>

      {/* TASK INPUT AREA */}
      {isInputVisible && (
        <div className="my-5">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)} // Update newTask state on input change
            className="p-2 border rounded w-full mb-3"
            placeholder="Enter new task"
          />
          <div className="flex gap-3">
            <button
              onClick={addTask}
              className="bg-green-500 text-white p-2 rounded"
            >
              Add Task
            </button>
            <button
              onClick={() => setIsInputVisible(false)} // Close input area
              className="bg-red-500 text-white p-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* TASKS LIST */}
      <div className="flex flex-col gap-5 bg-gray-50 p-5 rounded-lg">
        <h2 className="text-black font-bold my-5 text-4xl">Your tasks</h2>
        {tasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="w-full bg-black rounded-lg p-2 text-white flex justify-between items-center">
              <div>
                <h3 className="text-2xl">{task.task}</h3>
              </div>
              <DropdownMenu />
              <button onClick={() => deleteTask(task.id)} className="text-red-500">Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
