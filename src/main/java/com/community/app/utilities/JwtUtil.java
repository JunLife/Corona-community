package com.community.app.utilities;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Date;

@ConfigurationProperties(prefix = "application.jwt")
@Component
public class JwtUtil {

    private String accessTokenExpiration;

    public String generateAccessToken(Authentication authResult) {
        return generateToken(authResult.getName(), authResult.getAuthorities(), ACCESS_TOKEN_TIME);
    }

    public String generateRefreshToken(Authentication authResult) {
        return generateToken(authResult.getName(), authResult.getAuthorities(), REFRESH_TOKEN_TIME);
    }

    private String generateToken(String username, Collection<? extends GrantedAuthority> authorities, int expireTime) {
        Date now = new Date();

        String jws = Jwts.builder()
                .setSubject(username)
                .claim("authorities", authorities)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + expireTime))
                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()), SignatureAlgorithm.HS256)
                .compact();

        return jws;
    }
}
