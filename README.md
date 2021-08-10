
<h1>코로나19 커뮤니티 사이트</h2>
<br>

<h2>시연 영상: 유튜브 </h2>
<br>
https://youtu.be/DWU_UwwVmy4 <br>
https://youtu.be/FySB04Y3gdQ : 검색기능 누락되어 추가 업로드 했습니다.
<br>
<hr>

<h3>Tools</h3>

> Backend
> 
> * JDK 14
> * Spring Boot
> * Spring Security
> * Spring Data JPA
> * MariaDB
>
> 
> Frontend
> 
> * HTML, CSS
> * React.js
> * React-Bootstrap
> * React-Chart.js

<br>
<hr>
<br>

<h3>넣을(완성) 기능 리스트:</h3>

> 1. 이메일 회원가입, 중복 이메일 검증 (o)
> 2. 이메일 로그인, 로그아웃 (jwt) (o)
> 3. 대한민국 확진정보 (o)
> 4. 지역별 확진 정보 (o)
> 5. 자유게시판 CRUD (o)
> 6. 이미지 업로드, 다운로드 (o)
> 7. 게시판 페이징 (o)
> 8. 댓글 CRD (o)
> 9. 추천 CR (o)
> 10. 프로필 (o)

<br>
<hr>
<br>

<h3>주요기능</h3>
<br>

1. openAPI 정보 보여주기

![openAPI](https://user-images.githubusercontent.com/62829284/128834914-49a4b749-e404-4c33-b68f-d07520ad8031.gif)

<hr>

2. 회원가입

![signup](https://user-images.githubusercontent.com/62829284/128848768-4be8c871-ad0a-46a1-b1ca-4bed644ccb4f.gif)

<br>
이메일 형식 검증은 frontend에서 정규식을 이용해서 확인했습니다.
<br>
비밀번호 일치 확인 또한 frontend에서 검증되도록 했습니다.
<br>
이메일 중복검증은 backend에서 유저목록을 findByEmail하여 확인했습니다.
<br>
```
    public void checkMember(String memberEmail) {
        Member existMember = memberRepository.findByEmail(memberEmail);

        if (existMember != null) {
            throw new ApiRequestException("Email Already Exists");
        }
    }
```

<hr>

3. 로그인

![login](https://user-images.githubusercontent.com/62829284/128847952-5bab151b-d028-4ff4-a167-e99f5c53a7ee.gif)

<br>
Spring Security filter를 이용해서 구현했습니다.
<br>
사용자가 인증을 요청하면 필터에서 인증을 시도하고, jwt를 생성해서 cookie에 저장되도록 했습니다.
<br>
```
@Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) {
        try {
            JWTAuthenticationRequest authenticationRequest = new ObjectMapper()
                    .readValue(request.getInputStream(), JWTAuthenticationRequest.class);

            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getEmail(),
                    authenticationRequest.getPassword()
            );

            Authentication authenticate = authenticationManager.authenticate(authentication);

            return authenticate;

        } catch (Exception e) {
            throw new ApiRequestException("Failed At AttemptAuthentication");
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
        String accessToken = jwtUtil.generateToken(authResult);
        response.addCookie(cookieUtil.createAccessCookie(accessToken));

        SecurityContextHolder.getContext().setAuthentication(authResult);

        chain.doFilter(request, response);
    }
```
<br>
또한 사용자가 요청하면 oncePerRequestFilter를 extends하여 인가되도록 했습니다.
<br>
```
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        Optional<Cookie> accessToken = cookieUtil.getCookie(request);

        if (accessToken == null) {
            filterChain.doFilter(request, response);
            return;
        }

        accessToken.ifPresent(token -> {
                    String jws = token.getValue();

                    if (jwtUtil.isValidToken(jws)) {
                        Claims claims = jwtUtil.getTokenBody(jws);

                        String username = claims.getSubject();

                        var authorities = (List<Map<String, String>>) claims.get("authorities");

                        Set<SimpleGrantedAuthority> simpleGrantedAuthorities = authorities.stream()
                                .map(m -> new SimpleGrantedAuthority(m.get("authority")))
                                .collect(Collectors.toSet());

                        Authentication authentication = new UsernamePasswordAuthenticationToken(
                                username,
                                null,
                                simpleGrantedAuthorities
                        );

                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    } else {
                        throw new IllegalStateException(String.format("Token %s cannot be trusted", token));
                    }

                }
        );

        filterChain.doFilter(request, response);
    }
```

<hr>

4. 게시글 목록 보여주기, 페이지네이션

![pagination](https://user-images.githubusercontent.com/62829284/128848169-d98e6ad3-37e6-4c41-9fe8-93a290ea4807.gif)

<br>
JPA의 Pageable 인터페이스를 이용해서 구현했습니다.
<br>
하단의 이동바는 리액트 부트스트랩과 js를 이용해서 구현했습니다.

<hr>

5. 글 검색 (제목)

![search](https://user-images.githubusercontent.com/62829284/128848464-77080850-1f98-4290-8acf-1ae8f1bc5e5a.gif)

<br>
검색 기능은 JPA에서 findByTitleContainingIgnoreCase로 대소문자 구분없이 제목이 포함되면 검색되도록 했습니다.
<br>
검색에서의 페이지네이션은 JPA의 Pageable 인터페이스를 이용해서 구현했습니다.

<hr>

6. 게시글 추천, 중복 추천 방지

![recommend2](https://user-images.githubusercontent.com/62829284/128835473-4cea1e2d-02f7-4ab5-b8e7-39a521411cd0.gif)
![recommend1](https://user-images.githubusercontent.com/62829284/128835491-d1ce40a5-491d-4156-b21f-4b5058a4ee48.gif)

<br>
게시글의 아이디와 유저의 아이디를 가지는 테이블을 생성하고,
<br>
테이블의 unique constraint를 게시글의 아이디와 멤버의 아이디로 하여 이미 존재하면 추천이 되지 않도록 했습니다.

<hr>

7. 댓글 달기, 댓글 삭제

![comment1](https://user-images.githubusercontent.com/62829284/128835481-50151739-1cca-4162-a1aa-864f7a473f46.gif)
![comment2](https://user-images.githubusercontent.com/62829284/128835484-1665e89e-364b-4006-ac65-df819ac8c7cb.gif)

<hr>

8. 글 쓰기

![write](https://user-images.githubusercontent.com/62829284/128835667-ea7f8093-6af5-4dbb-9a6b-713d158c061c.gif)

<br>
이미지 업로드는 form-data로 데이터를 backend로 전송하고 multipartfile 형식으로 받도록 했습니다.
<br>
multipartfile이 존재하면 이미지가 서버 저장소에 저장되고, 이미지의 이름이 DB에 저장됩니다.
<br>
이미지의 식별을 위해서 이미지 이름 앞에 저장된 시간을 같이 네이밍했습니다.
<br>

```
    public void save(Post post, String memberEmail, MultipartFile file) {
        try {
            Member member = memberRepository.findByEmail(memberEmail);
            post.setMember(member);

            String fileName = createFile(file);

            if (fileName != null) {
                post.setPhotoName(fileName);
            }

            postRepository.save(post);
        } catch (Exception e) {
            throw new ApiRequestException("Failed To Upload Post");
        }
    }
```

<hr>

9. 글 수정

![modify](https://user-images.githubusercontent.com/62829284/128835698-6295b667-2a97-4b56-96eb-9d1db23972af.gif)

<hr>

