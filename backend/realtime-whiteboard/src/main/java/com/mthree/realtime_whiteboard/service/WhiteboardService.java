package com.mthree.realtime_whiteboard.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
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

        whiteboard.setCollaborators(new ArrayList<>(List.of(managedArtist))); // add creator as initial collaborator

        return whiteboardRepository.save(whiteboard);
    }

    public Whiteboard updateWhiteboard(Long whiteboardId, List<ShapeEntity> shapes,
            @AuthenticationPrincipal Artist artist) {
        // Fetch the existing whiteboard
        Whiteboard existingWhiteboard = whiteboardRepository.findById(whiteboardId)
                .orElseThrow(() -> new RuntimeException("Whiteboard not found"));

        // Check if the artist is authorized (creator or collaborator)
        boolean isAuthorized = existingWhiteboard.getCreatedBy().getId().equals(artist.getId()) ||
                existingWhiteboard.getCollaborators().stream()
                        .anyMatch(collaborator -> collaborator.getId().equals(artist.getId()));

        if (!isAuthorized) {
            throw new RuntimeException("Not authorized to update this whiteboard");
        }

        // Update shapes
        if (shapes != null) {
            // Clear old shapes
            existingWhiteboard.getShapes().clear();
            for (ShapeEntity shape : shapes) {
                shape.setWhiteboard(existingWhiteboard);
                existingWhiteboard.getShapes().add(shape);
            }
        }

        // Save updated whiteboard
        return whiteboardRepository.save(existingWhiteboard);
    }

    public List<Whiteboard> getAllWhiteboards() {
        return whiteboardRepository.findAll();
    }

    public Whiteboard getWhiteboardById(Long id) {
        return whiteboardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Whiteboard not found"));
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

    public List<ShapeEntity> getShapesByWhiteboardId(Long whiteboardId) {
        Whiteboard whiteboard = whiteboardRepository.findById(whiteboardId)
                .orElseThrow(() -> new RuntimeException("Whiteboard not found"));
        return whiteboard.getShapes();
    }
}
