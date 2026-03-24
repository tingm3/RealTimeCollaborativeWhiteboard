package com.mthree.realtime_whiteboard.repository;

import com.mthree.realtime_whiteboard.model.ShapeEntity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ShapeRepository extends JpaRepository<ShapeEntity, Long> {
}
