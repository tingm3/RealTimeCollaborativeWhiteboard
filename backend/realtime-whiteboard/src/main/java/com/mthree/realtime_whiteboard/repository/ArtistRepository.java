package com.mthree.realtime_whiteboard.repository;

import com.mthree.realtime_whiteboard.model.Artist;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtistRepository extends JpaRepository<Artist, Long> {
    Optional<Artist> findByUsername(String username);
}
