package com.mthree.realtime_whiteboard.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mthree.realtime_whiteboard.model.Artist;
import com.mthree.realtime_whiteboard.model.Whiteboard;

public interface WhiteboardRepository extends JpaRepository<Whiteboard, Long> {

    List<Whiteboard> findByCollaboratorsContaining(Artist artist);

}
