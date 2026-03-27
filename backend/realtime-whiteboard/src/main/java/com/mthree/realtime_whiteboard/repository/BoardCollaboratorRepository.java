package com.mthree.realtime_whiteboard.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mthree.realtime_whiteboard.model.BoardCollaborator;
import com.mthree.realtime_whiteboard.model.BoardCollaboratorId;

@Repository
public interface BoardCollaboratorRepository extends JpaRepository<BoardCollaborator, BoardCollaboratorId> {

    Optional<BoardCollaborator> findByWhiteboardIdAndArtistId(Long whiteboardId, Long artistId);

    List<BoardCollaborator> findByWhiteboardId(Long whiteboardId);

    List<BoardCollaborator> findByArtistId(Long artistId);

    boolean existsByWhiteboardIdAndArtistId(Long whiteboardId, Long artistId);

    void deleteByWhiteboardIdAndArtistId(Long whiteboardId, Long artistId);
}
