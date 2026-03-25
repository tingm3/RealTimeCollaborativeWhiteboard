package com.mthree.realtime_whiteboard.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "whiteboards")
public class Whiteboard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "whiteboard", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ShapeEntity> shapes = new ArrayList<>();

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<ShapeEntity> getShapes() {
        return shapes;
    }

    public void setShapes(List<ShapeEntity> shapes) {
        this.shapes = shapes;
    }
}
