package com.mthree.realtime_whiteboard.controller;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mthree.realtime_whiteboard.model.Artist;
import com.mthree.realtime_whiteboard.model.Whiteboard;
import com.mthree.realtime_whiteboard.repository.ArtistRepository;
import com.mthree.realtime_whiteboard.repository.WhiteboardRepository;
import com.mthree.realtime_whiteboard.service.WhiteboardService;

@RestController
@RequestMapping("/whiteboards")
public class WhiteboardController {

    private final WhiteboardService service;
    private final WhiteboardRepository whiteboardRepository;
    private final ArtistRepository artistRepository;

    public WhiteboardController(WhiteboardService service, WhiteboardRepository whiteboardRepository, ArtistRepository artistRepository) {
        this.service = service;
        this.whiteboardRepository = whiteboardRepository;
        this.artistRepository = artistRepository;
    }

    // POST /whiteboards
    @PostMapping
    public Whiteboard create(@RequestBody Whiteboard whiteboard, @AuthenticationPrincipal Artist artist) {
        return service.saveWhiteboard(whiteboard, artist);
    }

    // GET /whiteboards
    @GetMapping
    public List<Whiteboard> getAll() {
        return service.getAllWhiteboards();
    }

    public List<Artist> getCollaborators(Long whiteboardId) {
        Whiteboard whiteboard = whiteboardRepository.findById(whiteboardId)
                .orElseThrow(() -> new RuntimeException("Whiteboard not found"));
        return whiteboard.getCollaborators();
    }

    public void addCollaborator(Long whiteboardId, Long artistId) {
        Whiteboard whiteboard = whiteboardRepository.findById(whiteboardId)
                .orElseThrow(() -> new RuntimeException("Whiteboard not found"));
        Artist artist = artistRepository.findById(artistId)
                .orElseThrow(() -> new RuntimeException("Artist not found"));

        if (!whiteboard.getCollaborators().contains(artist)) {
            whiteboard.getCollaborators().add(artist);
            whiteboardRepository.save(whiteboard);
        }
    }

    public void removeCollaborator(Long whiteboardId, Long artistId) {
        Whiteboard whiteboard = whiteboardRepository.findById(whiteboardId)
                .orElseThrow(() -> new RuntimeException("Whiteboard not found"));
        Artist artist = artistRepository.findById(artistId)
                .orElseThrow(() -> new RuntimeException("Artist not found"));

        whiteboard.getCollaborators().remove(artist);
        whiteboardRepository.save(whiteboard);
    }
}
