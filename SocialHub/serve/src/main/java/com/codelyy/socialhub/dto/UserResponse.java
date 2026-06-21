package com.codelyy.socialhub.dto;

public record UserResponse(
        Long id,
        String account,
        String firstName,
        String lastName,
        String head,
        long followerCount,
        boolean followed
) {}
