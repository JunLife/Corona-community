package com.community.app.repository;

import com.community.app.model.Member;
import com.community.app.model.Recommend;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecommendRepository extends JpaRepository<Recommend, Long> {

    Recommend findByMember(Member member);
}
