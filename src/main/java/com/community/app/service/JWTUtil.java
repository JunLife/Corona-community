package com.community.app.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.Date;

@ConfigurationProperties(prefix = "application.jwt")
@Component
@Setter
@Getter
public class JWTUtil {
    private int accessTokenExpiration;
    private String secretKey;
    private String accessTokenName;

    public String generateToken(Authentication authResult) {
        Date now = new Date();
        System.out.println(now);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(now);
        calendar.add(Calendar.DATE, accessTokenExpiration);
        System.out.println(calendar.getTime());

        return Jwts.builder()
                .setSubject(authResult.getName())
                .claim("authorities", authResult.getAuthorities())
                .setIssuedAt(now)
                .setExpiration(calendar.getTime())
                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isValidToken(String jws) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(secretKey.getBytes())
                    .build()
                    .parseClaimsJws(jws);

            return true;
        } catch (IllegalArgumentException | JwtException e) {
            System.out.println("유효하지 않은 토큰 " + e.getMessage());
            return false;
        }
    }

    public Claims getTokenBody(String jws) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey.getBytes())
                .build()
                .parseClaimsJws(jws)
                .getBody();
    }
}
