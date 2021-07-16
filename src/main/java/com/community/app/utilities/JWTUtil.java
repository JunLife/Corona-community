package com.community.app.utilities;

import com.community.app.jwt.UserTest;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Date;

@ConfigurationProperties(prefix = "application.jwt")
@Component
@Setter
@Getter
public class JWTUtil {
    private Long accessTokenExpiration;
    private Long refreshTokenExpiration;
    private String secretKey;
    private String accessTokenName;

    public String generateAccessToken(Authentication authResult) {
        return generateToken(authResult.getName(), authResult.getAuthorities(), accessTokenExpiration);
    }

    public String generateRefreshToken(Authentication authResult) {
        return generateToken(authResult.getName(), authResult.getAuthorities(), refreshTokenExpiration);
    }

    private String generateToken(String username, Collection<? extends GrantedAuthority> authorities, Long expireTime) {
        Date now = new Date();

        return Jwts.builder()
                .setSubject(username)
                .claim("authorities", authorities)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + expireTime))
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

    public String getUser(String jws) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey.getBytes())
                .build()
                .parseClaimsJws(jws)
                .getBody()
                .getSubject();
    }
}
