package com.infotrode.taskmanager.service;


import com.infotrode.taskmanager.dto.TaskDTO;
import com.infotrode.taskmanager.entity.Task;
import com.infotrode.taskmanager.exception.ResourceNotFoundException;
import com.infotrode.taskmanager.repository.TaskRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TaskServiceImpl implements TaskService {
    private TaskRepository taskRepository;
    private ModelMapper modelMapper;
    @Override
    public TaskDTO createTask(TaskDTO taskDTO) {
        Task task = modelMapper.map(taskDTO, Task.class);
        Task savedTask = taskRepository.save(task);
        return modelMapper.map(savedTask, TaskDTO.class);
    }
    @Override
    public TaskDTO getTaskById(Long taskId) {
        Task retrievedTask = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task does not exist with id: " + taskId));
        return modelMapper.map(retrievedTask, TaskDTO.class);
    }
    @Override
    public List<TaskDTO> getAllTasks() {
        List<Task> retrievedTasks = taskRepository.findAll();
        return retrievedTasks.stream().map((task) -> modelMapper.map(task, TaskDTO.class))
                .collect(Collectors.toList());
    }
    @Override
    public TaskDTO updateTaskById(Long taskId, TaskDTO taskDTO) {
        Task retrievedTask = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task does not exist with id: " + taskId));
        retrievedTask.setTitle(taskDTO.getTitle());
        retrievedTask.setDescription(taskDTO.getDescription());
        retrievedTask.setCompleted(taskDTO.isCompleted());
        Task updatedTask = taskRepository.save(retrievedTask);
        return modelMapper.map(updatedTask, TaskDTO.class);
    }
    @Override
    public void deleteTaskById(Long taskId) {
        taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task does not exist with id: " + taskId));
        taskRepository.deleteById(taskId);
    }
    @Override
    public TaskDTO markComplete(Long taskId) {
        Task retrievedTask = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task does not exist with id: " + taskId));
        retrievedTask.setCompleted(Boolean.TRUE);
        Task updatedTask = taskRepository.save(retrievedTask);
        return modelMapper.map(updatedTask, TaskDTO.class);
    }
    @Override
    public TaskDTO markIncomplete(Long taskId) {
        Task retrievedTask = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task does not exist with id: " + taskId));
        retrievedTask.setCompleted(Boolean.FALSE);
        Task updatedTask = taskRepository.save(retrievedTask);
        return modelMapper.map(updatedTask, TaskDTO.class);
    }
}
