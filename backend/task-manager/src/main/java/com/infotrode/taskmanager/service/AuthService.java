package com.infotrode.taskmanager.service;

import com.infotrode.taskmanager.dto.LoginDTO;
import com.infotrode.taskmanager.dto.RegisterDTO;

public interface AuthService {
    String register (RegisterDTO registerDTO);
    String login (LoginDTO loginDTO);
}
