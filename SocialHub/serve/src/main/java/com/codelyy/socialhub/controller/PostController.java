package com.codelyy.socialhub.controller;

import com.codelyy.socialhub.dto.CreatePostRequest;
import com.codelyy.socialhub.dto.PostResponse;
import com.codelyy.socialhub.service.PostService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public List<PostResponse> findByUserId(@RequestParam Long userId) {
        return postService.findByUserId(userId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PostResponse create(
            @AuthenticationPrincipal Long currentUserId,
            @Valid @RequestBody CreatePostRequest request
    ) {
        return postService.create(currentUserId, request);
    }
}
