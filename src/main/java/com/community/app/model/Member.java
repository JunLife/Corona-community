package com.community.app.model;

import com.community.app.config.Role;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 32)
    private String email;

    @Column(nullable = false, length = 128)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 16)
    private Role role = Role.ROLE_MEMBER;

    @Column(length = 16)
    private String phoneNumber;

    @Column(length = 16)
    private String firstName;

    @Column(length = 16)
    private String lastName;

    private String photo;
    private String greeting;
    private int age;
}
