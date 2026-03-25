package com.mthree.realtime_whiteboard.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mthree.realtime_whiteboard.model.Whiteboard;
import com.mthree.realtime_whiteboard.service.WhiteboardService;

@RestController
@RequestMapping("/whiteboards")
public class WhiteboardController {

    private final WhiteboardService service;

    public WhiteboardController(WhiteboardService service) {
        this.service = service;
    }

    @PostMapping
    public Whiteboard create(@RequestBody Whiteboard whiteboard) {
        return service.saveWhiteboard(whiteboard);
    }
}
