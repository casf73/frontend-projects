package com.codelyy.socialhub.service;

import com.codelyy.socialhub.dto.AuthResponse;
import com.codelyy.socialhub.dto.LoginRequest;
import com.codelyy.socialhub.dto.RegisterRequest;
import com.codelyy.socialhub.dto.UserResponse;
import com.codelyy.socialhub.entity.Follow;
import com.codelyy.socialhub.entity.User;
import com.codelyy.socialhub.repository.FollowRepository;
import com.codelyy.socialhub.repository.UserRepository;
import com.codelyy.socialhub.security.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final FollowRepository followRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserService(
            UserRepository userRepository,
            FollowRepository followRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.followRepository = followRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Transactional
    public UserResponse register(RegisterRequest request) {
        String account = request.account().trim();
        if (userRepository.existsByAccount(account)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "用户名已存在");
        }

        User user = new User();
        user.setAccount(account);
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setFirstName(request.firstName().trim());
        user.setLastName(request.lastName().trim());
        user.setHead(request.head());

        User saved = userRepository.save(user);
        return toResponse(saved, null);
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByAccount(request.account().trim())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "用户名或密码错误"));

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "用户名或密码错误");
        }

        return new AuthResponse(jwtService.generateToken(user.getId()), toResponse(user, user.getId()));
    }

    @Transactional(readOnly = true)
    public List<UserResponse> findAll(Long currentUserId) {
        return userRepository.findAll().stream()
                .filter(user -> !user.getId().equals(currentUserId))
                .map(user -> toResponse(user, currentUserId))
                .toList();
    }

    @Transactional(readOnly = true)
    public UserResponse findById(Long userId, Long currentUserId) {
        return toResponse(requireUser(userId), currentUserId);
    }

    @Transactional
    public void follow(Long currentUserId, Long targetUserId) {
        if (currentUserId.equals(targetUserId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "不能关注自己");
        }
        if (followRepository.existsByFollowerIdAndFollowingId(currentUserId, targetUserId)) {
            return;
        }

        Follow follow = new Follow();
        follow.setFollower(requireUser(currentUserId));
        follow.setFollowing(requireUser(targetUserId));
        followRepository.save(follow);
    }

    @Transactional
    public void unfollow(Long currentUserId, Long targetUserId) {
        followRepository.deleteByFollowerIdAndFollowingId(currentUserId, targetUserId);
    }

    public User requireUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "用户不存在"));
    }

    private UserResponse toResponse(User user, Long currentUserId) {
        boolean followed = currentUserId != null
                && !currentUserId.equals(user.getId())
                && followRepository.existsByFollowerIdAndFollowingId(currentUserId, user.getId());

        return new UserResponse(
                user.getId(),
                user.getAccount(),
                user.getFirstName(),
                user.getLastName(),
                user.getHead(),
                followRepository.countByFollowingId(user.getId()),
                followed
        );
    }
}
