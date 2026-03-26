package com.mthree.realtime_whiteboard.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mthree.realtime_whiteboard.model.Artist;
import com.mthree.realtime_whiteboard.model.Whiteboard;
import com.mthree.realtime_whiteboard.service.CollaboratorService;
import com.mthree.realtime_whiteboard.service.WhiteboardService;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/whiteboards")
public class WhiteboardController {

    private final WhiteboardService service;
    private final CollaboratorService collaboratorService;

    public WhiteboardController(WhiteboardService service, CollaboratorService collaboratorService) {
        this.service = service;
        this.collaboratorService = collaboratorService;
    }

    // POST /whiteboards
    @PostMapping
    public Whiteboard create(@RequestBody Whiteboard whiteboard,
            @AuthenticationPrincipal Artist artist) {
        return service.saveWhiteboard(whiteboard, artist);
    }

    // GET /whiteboards
    @GetMapping
    public List<Whiteboard> getAll() {
        return service.getAllWhiteboards();
    }

    @GetMapping("/search")
    public List<Whiteboard> search(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String artist) {
        return service.search(title, artist);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id,
            @AuthenticationPrincipal Artist artist) {
        service.deleteWhiteboard(id, artist);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/shared")
    @Transactional
    public ResponseEntity<List<Whiteboard>> getSharedBoards(@AuthenticationPrincipal Artist artist) {
        List<Whiteboard> shared = collaboratorService.getSharedBoards(artist);
        return ResponseEntity.ok(shared);
    }
}
