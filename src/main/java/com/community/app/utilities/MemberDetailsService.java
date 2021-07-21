package com.community.app.utilities;

import com.community.app.model.Member;
import com.community.app.repository.MemberRopository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MemberDetailsService implements UserDetailsService {
    MemberRopository memberRopository;

    public MemberDetailsService(MemberRopository memberRopository) {
        this.memberRopository = memberRopository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            Member member = memberRopository.findByEmail(username);
            List<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority(member.getRole().name()));

            return new User(member.getEmail(), member.getPassword(), authorities);
        } catch (Exception e) {
             throw new UsernameNotFoundException(String.format("Username %s not found", username));
        }
    }
}
