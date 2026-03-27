package com.mthree.realtime_whiteboard.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.mthree.realtime_whiteboard.model.Artist;
import com.mthree.realtime_whiteboard.model.BoardCollaborator;
import com.mthree.realtime_whiteboard.model.PermissionRole;
import com.mthree.realtime_whiteboard.model.Whiteboard;
import com.mthree.realtime_whiteboard.repository.ArtistRepository;
import com.mthree.realtime_whiteboard.repository.BoardCollaboratorRepository;
import com.mthree.realtime_whiteboard.repository.WhiteboardRepository;

@Service
public class CollaboratorService {

    private final WhiteboardRepository whiteboardRepository;
    private final ArtistRepository artistRepository;
    private final BoardCollaboratorRepository collaboratorRepository;

    public CollaboratorService(
            WhiteboardRepository whiteboardRepository,
            ArtistRepository artistRepository,
            BoardCollaboratorRepository collaboratorRepository) {
        this.whiteboardRepository = whiteboardRepository;
        this.artistRepository = artistRepository;
        this.collaboratorRepository = collaboratorRepository;
    }

    // ============ PERMISSION CHECKS ============
    public Optional<PermissionRole> getPermissionLevel(Long whiteboardId, Long artistId) {
        return collaboratorRepository.findByWhiteboardIdAndArtistId(whiteboardId, artistId)
                .map(BoardCollaborator::getPermissionLevel);
    }

    public boolean isOwner(Long whiteboardId, Long userId) {
        return whiteboardRepository.findById(whiteboardId)
                .map(w -> w.getCreatedBy().getId().equals(userId))
                .orElse(false);
    }

    public boolean canEdit(Long whiteboardId, Long artistId) {
        if (isOwner(whiteboardId, artistId)) {
            return true;
        }
        return collaboratorRepository.findByWhiteboardIdAndArtistId(whiteboardId, artistId)
                .map(BoardCollaborator::canEdit)
                .orElse(false);

    }

    public boolean canView(Long whiteboardId, Long artistId) {
        if (isOwner(whiteboardId, artistId)) {
            return true;
        }
        return collaboratorRepository.existsByWhiteboardIdAndArtistId(whiteboardId, artistId);

    }

    public List<BoardCollaborator> getCollaborators(Long whiteboardId) {
        return whiteboardRepository.findById(whiteboardId)
                .orElseThrow().getCollaborators();
    }

    public void addCollaborator(Long whiteboardId, Long userId, PermissionRole role) {
        Whiteboard whiteboard = whiteboardRepository.findById(whiteboardId).orElseThrow();
        Artist artist = artistRepository.findById(userId).orElseThrow();
        if (collaboratorRepository.existsByWhiteboardIdAndArtistId(whiteboardId, userId)) {
            throw new IllegalStateException("User already has access");
        }

        BoardCollaborator collaborator = new BoardCollaborator(whiteboard, artist, role);
        collaboratorRepository.save(collaborator);
    }

    public void removeCollaborator(Long whiteboardId, Long userId) {
        Whiteboard whiteboard = whiteboardRepository.findById(whiteboardId).orElseThrow();
        whiteboard.getCollaborators().removeIf(a -> a.getId().equals(userId));
        whiteboardRepository.save(whiteboard);
    }

    public List<Whiteboard> getSharedBoards(Artist artist) {
        return collaboratorRepository.findByArtistId(artist.getId())
                .stream()
                .map(BoardCollaborator::getWhiteboard)
                .filter(w -> !w.getCreatedBy().getId().equals(artist.getId()))
                .toList();
    }

    public List<Whiteboard> searchShared(Artist artist, String title, String creatorUsername) {
        return getSharedBoards(artist).stream()
                // filter by title if provided
                .filter(w -> title == null
                || (w.getName() != null && w.getName().toLowerCase().contains(title.toLowerCase())))
                // filter by creator username if provided
                .filter(w -> creatorUsername == null
                || (w.getCreatedBy() != null && w.getCreatedBy().getUsername() != null
                && w.getCreatedBy().getUsername().toLowerCase().contains(creatorUsername.toLowerCase())))
                .toList();
    }
}
