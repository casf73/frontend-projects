package com.codelyy.socialhub.repository;

import com.codelyy.socialhub.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByAccount(String account);
    boolean existsByAccount(String account);
}
