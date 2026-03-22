package com.khalil.whiteboard.realtime_whiteboard.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.khalil.whiteboard.realtime_whiteboard.model.Stroke;

@Controller
public class WhiteboardController {

    @MessageMapping("/draw")
    @SendTo("/topic/drawings")
    public Stroke broadcastStroke(Stroke stroke) {
        // Save the stroke to the database or in-memory storage
        // Return the saved stroke with an ID or any additional information if needed
        return stroke;

    }

    @MessageMapping("/erase")
    @SendTo("/topic/erase")
    public String broadcastErase(String message) {
        // Handle erase action and broadcast to clients
        return "ERASE";
    }
}
