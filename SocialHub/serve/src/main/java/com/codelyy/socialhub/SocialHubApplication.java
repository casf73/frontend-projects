package com.codelyy.socialhub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;

@SpringBootApplication(exclude = UserDetailsServiceAutoConfiguration.class)
public class SocialHubApplication {
    public static void main(String[] args) {
        SpringApplication.run(SocialHubApplication.class, args);
    }
}
