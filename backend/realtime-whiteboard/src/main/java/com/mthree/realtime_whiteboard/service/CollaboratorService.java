package com.mthree.realtime_whiteboard.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mthree.realtime_whiteboard.model.Artist;
import com.mthree.realtime_whiteboard.model.Whiteboard;
import com.mthree.realtime_whiteboard.repository.ArtistRepository;
import com.mthree.realtime_whiteboard.repository.WhiteboardRepository;

@Service
public class CollaboratorService {

    private final WhiteboardRepository whiteboardRepository;
    private final ArtistRepository artistRepository;

    public CollaboratorService(
            WhiteboardRepository whiteboardRepository,
            ArtistRepository artistRepository) {
        this.whiteboardRepository = whiteboardRepository;
        this.artistRepository = artistRepository;
    }

    public List<Artist> getCollaborators(Long whiteboardId) {
        return whiteboardRepository.findById(whiteboardId)
                .orElseThrow().getCollaborators();
    }

    public void addCollaborator(Long whiteboardId, Long userId) {
        Whiteboard whiteboard = whiteboardRepository.findById(whiteboardId).orElseThrow();
        Artist artist = artistRepository.findById(userId).orElseThrow();
        if (!whiteboard.getCollaborators().contains(artist)) {
            whiteboard.getCollaborators().add(artist);
            whiteboardRepository.save(whiteboard);
        }
    }

    public void removeCollaborator(Long whiteboardId, Long userId) {
        Whiteboard whiteboard = whiteboardRepository.findById(whiteboardId).orElseThrow();
        whiteboard.getCollaborators().removeIf(a -> a.getId().equals(userId));
        whiteboardRepository.save(whiteboard);
    }

    public List<Whiteboard> getSharedBoards(Artist artist) {
        return whiteboardRepository.findByCollaboratorsContaining(artist)
                .stream()
                .filter(w -> !w.getCreatedBy().getId().equals(artist.getId()))
                .toList();
    }
}
