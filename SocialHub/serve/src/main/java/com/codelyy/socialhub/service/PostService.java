package com.codelyy.socialhub.service;

import com.codelyy.socialhub.dto.CreatePostRequest;
import com.codelyy.socialhub.dto.PostResponse;
import com.codelyy.socialhub.entity.Post;
import com.codelyy.socialhub.entity.User;
import com.codelyy.socialhub.repository.PostRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final UserService userService;

    public PostService(PostRepository postRepository, UserService userService) {
        this.postRepository = postRepository;
        this.userService = userService;
    }

    @Transactional(readOnly = true)
    public List<PostResponse> findByUserId(Long userId) {
        userService.requireUser(userId);
        return postRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public PostResponse create(Long currentUserId, CreatePostRequest request) {
        User user = userService.requireUser(currentUserId);

        Post post = new Post();
        post.setUser(user);
        post.setContent(request.content().trim());
        return toResponse(postRepository.save(post));
    }

    private PostResponse toResponse(Post post) {
        User author = post.getUser();
        return new PostResponse(
                post.getId(),
                author.getId(),
                author.getLastName() + author.getFirstName(),
                post.getContent(),
                post.getCreatedAt()
        );
    }
}
