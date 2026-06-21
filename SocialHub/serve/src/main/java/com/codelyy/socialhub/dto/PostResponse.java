package com.codelyy.socialhub.dto;

import java.time.LocalDateTime;

public record PostResponse(
        Long id,
        Long userId,
        String authorName,
        String content,
        LocalDateTime createdAt
) {}
