package com.community.app.config;

import com.community.app.jwt.JWTRequestFilter;
import com.community.app.jwt.JWTUsernameAndPasswordAuthenticationFilter;
import com.community.app.service.CookieUtil;
import com.community.app.service.JWTUtil;
import com.community.app.service.MemberDetailsService;
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
    private final CookieUtil cookieUtil;
    private final JWTUtil jwtUtil;
    private final MemberDetailsService memberDetailsService;

    public SecurityConfig(PasswordEncoder passwordEncoder,
                          CookieUtil cookieUtil,
                          JWTUtil jwtUtil,
                          MemberDetailsService memberDetailsService) {
        this.passwordEncoder = passwordEncoder;
        this.cookieUtil = cookieUtil;
        this.jwtUtil = jwtUtil;
        this.memberDetailsService = memberDetailsService;
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
                    .antMatchers("/", "/signup", "/login").permitAll()
                    .antMatchers("/adminTest").hasAuthority(Role.ROLE_ADMIN.name())
//                    .anyRequest().authenticated()
                    .anyRequest().permitAll()
                    .and()
                .formLogin()
                    .disable()
                .logout()
                    .disable()
                .addFilter(new JWTUsernameAndPasswordAuthenticationFilter(authenticationManager(), jwtUtil, cookieUtil))
                .addFilterBefore(
                        new JWTRequestFilter(jwtUtil, cookieUtil),
                        JWTUsernameAndPasswordAuthenticationFilter.class
                );
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(daoAuthenticationProvider());
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder);
        provider.setUserDetailsService(memberDetailsService);
        return provider;
    }
}
