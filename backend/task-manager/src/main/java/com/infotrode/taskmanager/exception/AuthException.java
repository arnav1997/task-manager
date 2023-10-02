package com.infotrode.taskmanager.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
//@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class AuthException extends RuntimeException {
    private HttpStatus httpStatus;
    private String message;
}