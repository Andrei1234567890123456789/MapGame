package com.example.MapGame.service;

import com.example.MapGame.model.dto.CreateLandmarkDTO;
import org.springframework.stereotype.Service;

@Service
public interface LandmarkService {
    void createLandmark(CreateLandmarkDTO dto);
}
