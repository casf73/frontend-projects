package com.codelyy.socialhub.dto;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @NotBlank(message = "用户名不能为空") String account,
        @NotBlank(message = "密码不能为空") String password
) {}
