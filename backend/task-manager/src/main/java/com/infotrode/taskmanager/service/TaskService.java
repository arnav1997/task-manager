package com.infotrode.taskmanager.service;

import com.infotrode.taskmanager.dto.TaskDTO;

import java.util.List;

public interface TaskService {
    TaskDTO createTask (TaskDTO taskDTO);
    TaskDTO getTaskById (Long taskId);
    List<TaskDTO> getAllTasks ();
    TaskDTO updateTaskById (Long taskId, TaskDTO taskDTO);
    void deleteTaskById (Long taskId);
    TaskDTO markComplete (Long taskId);
    TaskDTO markIncomplete (Long taskId);
}
