package com.mthree.realtime_whiteboard.model;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

// Enable polymorphic deserialization
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = Stroke.class, name = "pen"),
        @JsonSubTypes.Type(value = Rectangle.class, name = "rect"),
        @JsonSubTypes.Type(value = Circle.class, name = "circle"),
        @JsonSubTypes.Type(value = TextShape.class, name = "text"),
        @JsonSubTypes.Type(value = NoteShape.class, name = "note")
})
public interface Shape {

    Long getId(); // Unique identifier for the shape

    String getClientId(); // Optional client identifier

    String getType(); // Returns type of shape

    Whiteboard getWhiteboard(); // Reference to the whiteboard it belongs to

}
