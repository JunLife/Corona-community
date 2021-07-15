package com.community.app.utilities;

import javax.servlet.http.Cookie;

public class CookieUtil {
    public Cookie createCookie(String jws) {
        Cookie token = new Cookie("token", jws);
        token.setHttpOnly(true);
        token.setPath("/");
//        token.setMaxAge();
        return token;
    }
}
