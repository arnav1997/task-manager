import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/tasks";

export const listTasks = () => axios.get(REST_API_BASE_URL);

export const createTask = (task) =>
  axios.post(REST_API_BASE_URL, task);

export const getTaskById = (id) => 
  axios.get(REST_API_BASE_URL + "/" + id);

export const updateTaskById = (id, task) =>
  axios.put(REST_API_BASE_URL + "/" + id, task);

export const deleteTaskById = (id) =>
  axios.delete(REST_API_BASE_URL + "/" + id);

export const markComplete = (id) => 
  axios.patch(REST_API_BASE_URL + "/" + id + "/complete");

export const markIncomplete = (id) =>
  axios.patch(REST_API_BASE_URL + "/" + id + "/incomplete");