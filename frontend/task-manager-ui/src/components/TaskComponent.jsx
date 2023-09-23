import React, { useEffect, useState } from "react";
import {
  createTask,
  getTaskById,
  updateTaskById,
} from "../services/TaskService";
import { useNavigate, useParams } from "react-router-dom";

const TaskComponent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const navigator = useNavigate();
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    // email: "",
    // deptId: "",
  });
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getTaskById(id)
        .then((response) => {
          setTitle(response.data.title);
          setDescription(response.data.description);
          setCompleted(response.data.completed);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const validateForm = () => {
    let valid = true;
    const errorsCopy = { ...errors };

    if (title.trim()) {
      errorsCopy.title = "";
    } else {
      valid = false;
      errorsCopy.title = "Title can't be blank!";
    }

    if (description.trim()) {
      errorsCopy.description = "";
    } else {
      valid = false;
      errorsCopy.description = "Description can't be blank!";
    }

    // if (email.trim()) {
    //   errorsCopy.email = "";
    // } else {
    //   valid = false;
    //   errorsCopy.email = "Email ID can't be blank!";
    // }

    // if (deptId) {
    //   errorsCopy.deptId = "";
    // } else {
    //   valid = false;
    //   errorsCopy.deptId = "Department can't be blank!";
    // }

    setErrors(errorsCopy);
    return valid;
  };

  const saveTask = (e) => {
    e.preventDefault();

    const task = { title, description, completed };
    console.log(task);

    if (validateForm()) {
      if (id) {
        updateTaskById(id, task)
          .then((response) => {
            console.log(response);
            navigator("/tasks");
          })
          .catch((error) => {
            console.log(error);
            alert("Error!");
          });
      } else {
        createTask(task)
          .then((response) => {
            console.log(response);
            navigator("/tasks");
          })
          .catch((error) => {
            console.log(error);
            alert("Error!");
          });
      }
    }
  };

  const pageTitle = () => {
    if (id) {
      return <h2 className="text-center">Update Task</h2>;
    } else {
      return <h2 className="text-center">Add Task</h2>;
    }
  };

  return (
    <div className="container">
      <br /> <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Title:</label>
                <input
                  type="text"
                  placeholder="Enter Title"
                  name="title"
                  value={title}
                  className={`form-control ${errors.title ? "is-invalid" : ""}`}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
                {errors.title && (
                  <div className="invalid-feedback"> {errors.title} </div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Description:</label>
                <input
                  type="text"
                  placeholder="Enter Description"
                  name="description"
                  value={description}
                  className={`form-control ${
                    errors.description ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setDescription(e.target.value)}
                ></input>
                {errors.description && (
                  <div className="invalid-feedback"> {errors.description} </div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Task Status:</label>
                <div className="form-check form-switch">
                  <input
                    type="radio"
                    className="btn-check"
                    name="options-outlined"
                    id="success-outlined"
                    value="true"
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.value === "true")}
                    autoComplete="off"
                  />
                  <label
                    className="btn btn-outline-success me-3"
                    htmlFor="success-outlined"
                  >
                    Completed
                  </label>

                  <input
                    type="radio"
                    className="btn-check"
                    name="options-outlined"
                    id="danger-outlined"
                    value="false"
                    checked={!completed}
                    onChange={(e) => setCompleted(e.target.value === "true")}
                    autoComplete="off"
                  />
                  <label
                    className="btn btn-outline-danger"
                    htmlFor="danger-outlined"
                  >
                    Pending
                  </label>
                </div>
              </div>
              <div className="text-center">
                <button className="btn btn-success" onClick={saveTask}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskComponent;