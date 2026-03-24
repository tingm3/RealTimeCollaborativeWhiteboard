package com.mthree.realtime_whiteboard.model;

import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "shape_type")
public abstract class ShapeEntity implements Shape {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // server-assigned numeric ID

    private String clientId;

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public String getClientId() {
        return clientId;
    }
}
