package com.mthree.realtime_whiteboard.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mthree.realtime_whiteboard.model.Artist;
import com.mthree.realtime_whiteboard.service.CollaboratorService;

@RestController
@RequestMapping("/whiteboards/{whiteboardId}/collaborators")

public class CollaboratorController {

    private final CollaboratorService collaboratorService;

    public CollaboratorController(CollaboratorService collaboratorService) {
        this.collaboratorService = collaboratorService;
    }

    @GetMapping
    public List<Artist> getCollaborators(@PathVariable Long whiteboardId) {
        return collaboratorService.getCollaborators(whiteboardId);
    }

    @PostMapping
    public void addCollaborator(
            @PathVariable Long whiteboardId,
            @RequestBody Map<String, Object> body) {
        Long userId = Long.valueOf(body.get("userId").toString());
        // PermissionRole permission = PermissionRole.valueOf(body.get("permission").toString());
        collaboratorService.addCollaborator(whiteboardId, userId);
    }

    @DeleteMapping("/{userId}")
    public void removeCollaborator(
            @PathVariable Long whiteboardId,
            @PathVariable Long userId) {
        collaboratorService.removeCollaborator(whiteboardId, userId);
    }

}
