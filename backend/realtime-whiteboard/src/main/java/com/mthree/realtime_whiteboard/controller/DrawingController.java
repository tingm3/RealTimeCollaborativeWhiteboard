package com.mthree.realtime_whiteboard.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.mthree.realtime_whiteboard.model.ShapeEntity;
import com.mthree.realtime_whiteboard.repository.ShapeRepository;

@Controller
public class DrawingController {

    // Optional in-memory storage of all shapes (for new clients joining)
    private final List<ShapeEntity> drawingHistory = new ArrayList<>();
    private final ShapeRepository shapeRepository; // inject repository

    // Constructor injection (recommended)
    public DrawingController(ShapeRepository shapeRepository) {
        this.shapeRepository = shapeRepository;
    }

    /**
     * Broadcast any new shape (pen, rect, circle, text, note)
     */
    @MessageMapping("/draw")
    @SendTo("/topic/drawings")
    public ShapeEntity broadcastDrawing(ShapeEntity drawing) {
        ShapeEntity savedShape = shapeRepository.save(drawing);

        // Save to in-memory history
        drawingHistory.add(savedShape);

        // Broadcast to all clients
        return savedShape; // return saved shape with ID for clients to track
    }

    /**
     * Erase action (can be a full canvas clear or undo)
     */
    @MessageMapping("/erase")
    @SendTo("/topic/erase")
    public String eraseShape(String message) {
        if ("ALL".equalsIgnoreCase(message)) {
            // Clear in-memory history
            drawingHistory.clear();
            // Clear database
            shapeRepository.deleteAll();
            // Broadcast "ALL" to clients
            return "ALL";
        } else {
            try {
                Long id = Long.parseLong(message);
                // Remove from memory
                drawingHistory.removeIf(s -> s.getId().equals(id));
                // Remove from DB
                shapeRepository.deleteById(id);
                return id.toString();
            } catch (NumberFormatException e) {
                throw new IllegalArgumentException("Invalid erase ID: " + message);
            }
        }
    }

    /**
     * Optional: send full history to a new client
     */
    @MessageMapping("/history")
    @SendTo("/topic/drawings")
    public List<ShapeEntity> sendHistory() {
        return drawingHistory;
    }
}
