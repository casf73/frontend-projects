package com.codelyy.socialhub.repository;

import com.codelyy.socialhub.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByAccount(String account);

    boolean existsByAccount(String account);

    @Query("""
            SELECT u
            FROM User u
            WHERE CONCAT(u.lastName, u.firstName) LIKE :keyword
            ORDER BY u.id DESC
            """)
    List<User> searchByFullName(@Param("keyword") String keyword);
}
