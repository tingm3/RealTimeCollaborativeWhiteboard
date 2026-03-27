package com.mthree.realtime_whiteboard.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mthree.realtime_whiteboard.model.Artist;
import com.mthree.realtime_whiteboard.model.ShapeEntity;
import com.mthree.realtime_whiteboard.model.Whiteboard;
import com.mthree.realtime_whiteboard.repository.ArtistRepository;
import com.mthree.realtime_whiteboard.repository.WhiteboardRepository;

@Service
public class WhiteboardService {

    private final WhiteboardRepository whiteboardRepository;
    private final ArtistRepository artistRepository;

    public WhiteboardService(WhiteboardRepository whiteboardRepository, ArtistRepository artistRepository) {
        this.whiteboardRepository = whiteboardRepository;
        this.artistRepository = artistRepository;
    }

    public Whiteboard saveWhiteboard(Whiteboard whiteboard, Artist artist) {

        Artist managedArtist = artistRepository.findById(artist.getId())
                .orElseThrow(() -> new RuntimeException("Artist not found"));

        whiteboard.setCreatedBy(managedArtist);

        whiteboard.setCollaborators(List.of(managedArtist)); // add creator as initial collaborator

        for (ShapeEntity shape : whiteboard.getShapes()) {
            shape.setWhiteboard(whiteboard);
        }
        return whiteboardRepository.save(whiteboard);
    }

    public List<Whiteboard> getAllWhiteboards() {
        return whiteboardRepository.findAll();
    }

    public List<Whiteboard> search(String title, String artist) {
        if (title != null && artist != null) {
            return whiteboardRepository.findByNameContainingIgnoreCaseAndCreatedBy_UsernameContainingIgnoreCase(title,
                    artist);
        } else if (title != null) {
            return whiteboardRepository.findByNameContainingIgnoreCase(title);
        } else if (artist != null) {
            return whiteboardRepository.findByCreatedBy_UsernameContainingIgnoreCase(artist);
        }
        return whiteboardRepository.findAll();
    }

    public void deleteWhiteboard(Long id, Artist artist) {
        Whiteboard whiteboard = whiteboardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Whiteboard not found"));

        if (!whiteboard.getCreatedBy().getId().equals(artist.getId())) {
            throw new RuntimeException("Only the creator can delete this whiteboard");
        }
        whiteboardRepository.delete(whiteboard);
    }
}
