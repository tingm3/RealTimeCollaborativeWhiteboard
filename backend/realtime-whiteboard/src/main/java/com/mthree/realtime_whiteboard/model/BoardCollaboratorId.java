package com.mthree.realtime_whiteboard.model;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardCollaboratorId implements Serializable {

    private Long whiteboardId;
    private Long artistId;
}
