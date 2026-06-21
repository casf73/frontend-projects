package com.codelyy.socialhub.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank(message = "用户名不能为空")
        @Size(min = 3, max = 50, message = "用户名长度必须在 3 到 50 位之间")
        String account,

        @NotBlank(message = "密码不能为空")
        @Size(min = 6, max = 72, message = "密码长度必须在 6 到 72 位之间")
        String password,

        @NotBlank(message = "名字不能为空")
        @Size(max = 50, message = "名字不能超过 50 个字符")
        String firstName,

        @NotBlank(message = "姓氏不能为空")
        @Size(max = 50, message = "姓氏不能超过 50 个字符")
        String lastName,

        @Size(max = 3_000_000, message = "头像数据过大")
        String head
) {}
