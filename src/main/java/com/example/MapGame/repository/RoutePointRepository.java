package com.example.MapGame.repository;

import com.example.MapGame.model.entity.RoutePointEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoutePointRepository extends JpaRepository<RoutePointEntity, Long> {
}
