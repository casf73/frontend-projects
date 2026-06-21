package com.codelyy.socialhub.repository;

import com.codelyy.socialhub.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    boolean existsByFollowerIdAndFollowingId(Long followerId, Long followingId);
    long countByFollowingId(Long followingId);
    void deleteByFollowerIdAndFollowingId(Long followerId, Long followingId);
}
