package com.infotrode.taskmanager.repository;

import com.infotrode.taskmanager.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
