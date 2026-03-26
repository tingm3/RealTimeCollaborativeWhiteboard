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
import com.mthree.realtime_whiteboard.service.WhiteboardService;

@RestController
@RequestMapping("/whiteboards")
public class WhiteboardController {

    private final WhiteboardService service;

    public WhiteboardController(WhiteboardService service) {
        this.service = service;
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
}
