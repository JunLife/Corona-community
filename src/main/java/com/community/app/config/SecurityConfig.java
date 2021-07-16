package com.community.app.config;

import com.community.app.jwt.JWTRequestFilter;
import com.community.app.jwt.JWTUsernameAndPasswordAuthenticationFilter;
import com.community.app.jwt.UserTestService;
import com.community.app.utilities.CookieUtil;
import com.community.app.utilities.JWTUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final PasswordEncoder passwordEncoder;
    private final UserTestService userTestService;
    private final CookieUtil cookieUtil;
    private final JWTUtil jwtUtil;

    public SecurityConfig(PasswordEncoder passwordEncoder, UserTestService userTestService, JWTUtil jwtUtil, CookieUtil cookieUtil) {
        this.passwordEncoder = passwordEncoder;
        this.userTestService = userTestService;
        this.cookieUtil = cookieUtil;
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf()
                    .disable()
                .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                    .and()
                .authorizeRequests()
                .antMatchers("/login").permitAll()
                    .anyRequest().authenticated()
                    .and()
                .formLogin()
                    .disable()
                .addFilter(new JWTUsernameAndPasswordAuthenticationFilter(authenticationManager(), jwtUtil, cookieUtil))
                .addFilterBefore(new JWTRequestFilter(jwtUtil, cookieUtil), JWTUsernameAndPasswordAuthenticationFilter.class);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(daoAuthenticationProvider());
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder);
        provider.setUserDetailsService(userTestService);
        return provider;
    }
}
