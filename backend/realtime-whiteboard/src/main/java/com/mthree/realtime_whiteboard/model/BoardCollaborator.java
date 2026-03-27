package com.mthree.realtime_whiteboard.model;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "board_collaborators")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardCollaborator {

    @EmbeddedId
    private BoardCollaboratorId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("whiteboardId")
    @JoinColumn(name = "whiteboard_id")
    private Whiteboard whiteboard;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("artistId")
    @JoinColumn(name = "artist_id")
    private Artist artist;

    @Enumerated(EnumType.STRING)
    @Column(name = "permission_level", nullable = false)
    private PermissionRole permissionLevel;

    // Convenience constructor
    public BoardCollaborator(Whiteboard whiteboard, Artist artist, PermissionRole permissionLevel) {
        this.id = new BoardCollaboratorId(whiteboard.getId(), artist.getId());
        this.whiteboard = whiteboard;
        this.artist = artist;
        this.permissionLevel = permissionLevel;
    }

    public boolean canEdit() {
        return permissionLevel == PermissionRole.WRITE || permissionLevel == PermissionRole.ADMIN;
    }

    public boolean canManage() {
        return permissionLevel == PermissionRole.ADMIN;
    }
}
