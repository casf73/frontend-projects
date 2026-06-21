package com.codelyy.socialhub.controller;

import com.codelyy.socialhub.dto.MessageResponse;
import com.codelyy.socialhub.dto.UserResponse;
import com.codelyy.socialhub.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserResponse> findAll(@AuthenticationPrincipal Long currentUserId) {
        return userService.findAll(currentUserId);
    }

    @GetMapping("/{id}")
    public UserResponse findById(
            @PathVariable Long id,
            @AuthenticationPrincipal Long currentUserId
    ) {
        return userService.findById(id, currentUserId);
    }

    @PostMapping("/{id}/follow")
    public MessageResponse follow(
            @PathVariable Long id,
            @AuthenticationPrincipal Long currentUserId
    ) {
        userService.follow(currentUserId, id);
        return new MessageResponse("关注成功");
    }

    @DeleteMapping("/{id}/follow")
    public MessageResponse unfollow(
            @PathVariable Long id,
            @AuthenticationPrincipal Long currentUserId
    ) {
        userService.unfollow(currentUserId, id);
        return new MessageResponse("已取消关注");
    }
}
