package com.example.MapGame.repository;

import com.example.MapGame.model.entity.LandmarkEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LandmarkRepository extends JpaRepository<LandmarkEntity, Long> {
    boolean existsByTitle(String title);
}
