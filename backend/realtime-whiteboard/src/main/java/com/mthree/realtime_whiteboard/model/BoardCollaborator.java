package com.mthree.realtime_whiteboard.model;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Board_Collaborators")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardCollaborator {

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    //need to implement Serializable for composite key class in JPA, even if we don't use it as a key classd
    public static class BoardCollaboratorId implements Serializable {

        private Long artistId;
        private Long whiteboardId;

    }
    @Enumerated(EnumType.STRING)
    @Column(name = "PermissionLevel")
    private PermissionRole permissionLevel;

    @EmbeddedId
    private BoardCollaboratorId id;

    @ManyToOne
    @MapsId("artistId")
    @JoinColumn(name = "ArtistId")
    private Artist artist;

    @ManyToOne
    @MapsId("whiteboardId")
    @JoinColumn(name = "WhiteboardId")
    private Whiteboard whiteboard;

}
