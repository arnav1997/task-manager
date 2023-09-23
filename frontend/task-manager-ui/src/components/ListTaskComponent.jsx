import React from "react";
import { useEffect, useState } from "react";
import {
  deleteTaskById,
  listTasks,
  markComplete,
  markIncomplete,
} from "../services/TaskService";
import { useNavigate } from "react-router-dom";

const ListTaskComponent = () => {
  // Dummy data
  // const taskData = [{
  //     "id" : 1,
  //     "firstName" : "Arnav",
  //     "lastName" : "Mahapatra",
  //     "email" : "arnav.mahapatra31@gmail.com"
  // },
  // {
  //     "id" : 2,
  //     "firstName" : "Jenny",
  //     "lastName" : "Mahapatra",
  //     "email" : "jenny.mahapatra31@gmail.com"
  // },
  // {
  //     "id" : 3,
  //     "firstName" : "Moon",
  //     "lastName" : "Mahapatra",
  //     "email" : "moon.mahapatra31@gmail.com"
  // }];

  // Method 1 using fetch()
  // const [tasks, setTasks] = useState([]);

  // useEffect(() => {
  //   fetchTasks();
  // }, []);

  // const fetchTasks = async () => {
  //   const res = await fetch("http://localhost:8080/api/tasks/all");
  //   const data = await res.json();
  //   setTasks(data);
  // };

  // Method 2 using axios library
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = () => {
    listTasks()
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const navigator = useNavigate();

  const addNewTask = () => {
    navigator("/add-task");
  };

  const updateTask = (id) => {
    navigator(`/update-task/${id}`);
  };

  const deleteTask = (id) => {
    deleteTaskById(id)
      .then((response) => {
        console.log(response.data);
        getAllTasks();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleComplete = (id) => {
    markComplete(id)
      .then((response) => {
        console.log(response.data);
        getAllTasks();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleIncomplete = (id) => {
    markIncomplete(id)
      .then((response) => {
        console.log(response.data);
        getAllTasks();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <h2 className="text-center">Tasks</h2>
      <button
        type="button"
        className="btn btn-primary"
        style={{ marginBottom: "10px" }}
        onClick={() => addNewTask()}
      >
        Add Task
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <th>Task ID</th>
          <th>Task Title</th>
          <th>Task Description</th>
          <th>Task Status</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>
                <div className="form-check form-switch">
                  <input
                    type="radio"
                    className="btn-check"
                    name={`options-outlined-${task.id}`}
                    id={`success-outlined-${task.id}`}
                    value="true"
                    checked={task.completed}
                    onChange={() => handleComplete(task.id)}
                    autoComplete="off"
                  />
                  <label
                    className="btn btn-outline-success me-3"
                    htmlFor={`success-outlined-${task.id}`}
                  >
                    Completed
                  </label>

                  <input
                    type="radio"
                    className="btn-check"
                    name={`options-outlined-${task.id}`}
                    id={`danger-outlined-${task.id}`}
                    value="false"
                    checked={!task.completed}
                    onChange={() => handleIncomplete(task.id)}
                    autoComplete="off"
                  />
                  <label
                    className="btn btn-outline-danger"
                    htmlFor={`danger-outlined-${task.id}`}
                  >
                    Pending
                  </label>
                </div>
              </td>
              <td>
                <button
                  className="btn btn-info me-3"
                  onClick={() => updateTask(task.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListTaskComponent;