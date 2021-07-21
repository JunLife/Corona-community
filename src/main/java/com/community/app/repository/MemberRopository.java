package com.community.app.repository;

import com.community.app.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRopository extends JpaRepository<Member, Long> {
    Member findByEmail(String email);
}
