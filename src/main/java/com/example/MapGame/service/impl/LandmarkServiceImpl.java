package com.example.MapGame.service.impl;

import com.example.MapGame.model.dto.CreateLandmarkDTO;
import com.example.MapGame.model.entity.LandmarkEntity;
import com.example.MapGame.repository.LandmarkRepository;
import com.example.MapGame.service.LandmarkService;
import org.springframework.stereotype.Service;

@Service
public class LandmarkServiceImpl implements LandmarkService {

    private final LandmarkRepository landmarkRepository;

    public LandmarkServiceImpl(LandmarkRepository landmarkRepository) {
        this.landmarkRepository = landmarkRepository;
    }

    @Override
    public void createLandmark(CreateLandmarkDTO dto) {

        if (landmarkRepository.existsByTitle(dto.getTitle())) {
            System.out.println("Landmark already exists: " + dto.getTitle());
            return;
        }

        LandmarkEntity landmarkEntity = new LandmarkEntity();

        if(dto.getTitle() == null) {
            return;
        } else{
            landmarkEntity = new LandmarkEntity(dto.getTitle(),
                    dto.getDescription(),dto.getStatus(),dto.getLatitude(), dto.getLongitude(),dto.getImage(), dto.getAudio());
        }
        landmarkRepository.save(landmarkEntity);
    }
}
