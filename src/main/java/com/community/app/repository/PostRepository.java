package com.community.app.repository;

import com.community.app.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByMemberId(Long memberEmail);
    Page<Post> findByTitleContainingIgnoreCase(Pageable pageable, String keyword);
}
