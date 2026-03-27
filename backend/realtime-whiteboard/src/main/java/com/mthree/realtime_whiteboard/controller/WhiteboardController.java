package com.mthree.realtime_whiteboard.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mthree.realtime_whiteboard.model.Artist;
import com.mthree.realtime_whiteboard.model.ShapeEntity;
import com.mthree.realtime_whiteboard.model.Whiteboard;
import com.mthree.realtime_whiteboard.service.CollaboratorService;
import com.mthree.realtime_whiteboard.service.WhiteboardService;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/whiteboards")
public class WhiteboardController {

    private final WhiteboardService whiteboardService;
    private final CollaboratorService collaboratorService;

    public WhiteboardController(WhiteboardService whiteboardService, CollaboratorService collaboratorService) {
        this.whiteboardService = whiteboardService;
        this.collaboratorService = collaboratorService;
    }

    // POST /whiteboards
    @PostMapping
    public Whiteboard create(@RequestBody Whiteboard whiteboard,
            @AuthenticationPrincipal Artist artist) {
        return whiteboardService.saveWhiteboard(whiteboard, artist);
    }

    // GET /whiteboards
    @GetMapping
    public List<Whiteboard> getAll() {
        return whiteboardService.getAllWhiteboards();
    }

    @GetMapping("/{id}")
    public Whiteboard getById(@PathVariable Long id) {
        return whiteboardService.getWhiteboardById(id);
    }

    @GetMapping("/shared")
    @Transactional
    public ResponseEntity<List<Whiteboard>> getSharedBoards(@AuthenticationPrincipal Artist artist) {
        List<Whiteboard> shared = collaboratorService.getSharedBoards(artist);
        return ResponseEntity.ok(shared);
    }

    @PutMapping("/{id}/shapes")
    public Whiteboard updateShapes(@PathVariable Long id,
            @RequestBody List<ShapeEntity> shapes,
            @AuthenticationPrincipal Artist artist) {
        return this.whiteboardService.updateWhiteboard(id, shapes, artist);
    }

    @GetMapping("/search")
    public List<Whiteboard> search(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String artist) {
        return whiteboardService.search(title, artist);
    }

    @GetMapping("/shared/search")
    public List<Whiteboard> searchShared(@AuthenticationPrincipal Artist artist, String title, String creatorUsername) {
        return collaboratorService.searchShared(artist, title, creatorUsername);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id,
            @AuthenticationPrincipal Artist artist) {
        whiteboardService.deleteWhiteboard(id, artist);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/shapes")
    public ResponseEntity<List<ShapeEntity>> getShapes(@PathVariable Long id) {
        List<ShapeEntity> shapes = whiteboardService.getShapesByWhiteboardId(id);
        return ResponseEntity.ok(shapes);
    }

}
