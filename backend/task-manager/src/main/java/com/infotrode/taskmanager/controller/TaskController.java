package com.infotrode.taskmanager.controller;

import com.infotrode.taskmanager.dto.TaskDTO;
import com.infotrode.taskmanager.service.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/tasks")
public class TaskController {
    private TaskService taskService;
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TaskDTO> createTask (@RequestBody TaskDTO taskDTO) {
        TaskDTO savedTask = taskService.createTask(taskDTO);
        return new ResponseEntity<>(savedTask, HttpStatus.CREATED);
    }
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<List<TaskDTO>> getAllTasks () {
        List<TaskDTO> retrievedTaskDTOs = taskService.getAllTasks();
        return new ResponseEntity<>(retrievedTaskDTOs, HttpStatus.OK);
    }
    @GetMapping("{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<TaskDTO> getTaskById (@PathVariable(name = "id") Long taskId) {
        TaskDTO retrievedTask = taskService.getTaskById(taskId);
        return new ResponseEntity<>(retrievedTask, HttpStatus.OK);
    }
    @PutMapping("{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TaskDTO> updateTaskById (@PathVariable("id") Long taskId, @RequestBody TaskDTO taskDTO) {
        TaskDTO updatedTask = taskService.updateTaskById(taskId, taskDTO);
        return new ResponseEntity<>(updatedTask, HttpStatus.OK);
    }
    @PatchMapping("{id}/complete")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<TaskDTO> markComplete (@PathVariable("id") Long taskId) {
        TaskDTO updatedTask = taskService.markComplete(taskId);
        return new ResponseEntity<>(updatedTask, HttpStatus.OK);
    }
    @PatchMapping("{id}/incomplete")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<TaskDTO> markIncomplete (@PathVariable("id") Long taskId) {
        TaskDTO updatedTask = taskService.markIncomplete(taskId);
        return new ResponseEntity<>(updatedTask, HttpStatus.OK);
    }
    @DeleteMapping("{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteTaskById (@PathVariable("id") Long taskId) {
        taskService.deleteTaskById(taskId);
        return ResponseEntity.ok("Task deleted successfully!");
    }
}
