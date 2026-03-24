package com.khalil.whiteboard.realtime_whiteboard.repository;

import com.khalil.whiteboard.realtime_whiteboard.model.ShapeEntity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ShapeRepository extends JpaRepository<ShapeEntity, Long> {
}
