package com.khalil.whiteboard.realtime_whiteboard.repository;

import com.khalil.whiteboard.realtime_whiteboard.model.Artist;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtistRepository extends JpaRepository<Artist, Long> {
    Optional<Artist> findByUsername(String username);
}
