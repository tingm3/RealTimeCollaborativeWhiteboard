package com.mthree.realtime_whiteboard.service;

import org.springframework.stereotype.Service;

import com.mthree.realtime_whiteboard.model.ShapeEntity;
import com.mthree.realtime_whiteboard.model.Whiteboard;
import com.mthree.realtime_whiteboard.repository.WhiteboardRepository;

@Service
public class WhiteboardService {

    private final WhiteboardRepository whiteboardRepository;

    public WhiteboardService(WhiteboardRepository whiteboardRepository) {
        this.whiteboardRepository = whiteboardRepository;
    }

    public Whiteboard saveWhiteboard(Whiteboard whiteboard) {
        for (ShapeEntity shape : whiteboard.getShapes()) {
            shape.setWhiteboard(whiteboard);
        }
        return whiteboardRepository.save(whiteboard);
    }
}
