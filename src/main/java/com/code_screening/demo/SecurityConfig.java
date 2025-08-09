package com.code_screening.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/", "/form", "/confirm", // pages we want accessible
                                "/css/**", "/js/**", "/images/**", // static assets
                                "/login" // allow the login page
                        ).permitAll()
                        .anyRequest().authenticated())
                .formLogin(form -> form
                        .defaultSuccessUrl("/form", true) // Always redirect to /form after login
                        .permitAll())
                .rememberMe(rememberMe -> rememberMe
                        .key("uniqueAndSecret")
                        .tokenValiditySeconds(86400))
                .logout(logout -> logout
                        .logoutSuccessUrl("/form") // Redirect here after logout
                        .permitAll());

        return http.build();
    }
}
