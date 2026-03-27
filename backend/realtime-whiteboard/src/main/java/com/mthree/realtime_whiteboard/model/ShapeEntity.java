package com.mthree.realtime_whiteboard.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import jakarta.persistence.*;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({ @JsonSubTypes.Type(value = NoteShape.class, name = "note"),
        @JsonSubTypes.Type(value = Stroke.class, name = "pen"),
        @JsonSubTypes.Type(value = Rectangle.class, name = "rect"),
        @JsonSubTypes.Type(value = TextShape.class, name = "text"),
        @JsonSubTypes.Type(value = Circle.class, name = "circle") })
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "shape_type")
public abstract class ShapeEntity implements Shape {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // server-assigned numeric ID

    private String clientId;

    @ManyToOne
    @JoinColumn(name = "whiteboard_id")
    @JsonBackReference
    private Whiteboard whiteboard;

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public String getClientId() {
        return clientId;
    }

    @Override
    public Whiteboard getWhiteboard() {
        return whiteboard;
    }

    public void setWhiteboard(Whiteboard whiteboard) {
        this.whiteboard = whiteboard;
    }
}
