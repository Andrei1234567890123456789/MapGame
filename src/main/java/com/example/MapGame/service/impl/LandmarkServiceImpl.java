package com.example.MapGame.service.impl;

import com.example.MapGame.model.dto.CreateLandmarkDTO;
import com.example.MapGame.model.entity.AudioEntity;
import com.example.MapGame.model.entity.ImageEntity;
import com.example.MapGame.model.entity.LandmarkEntity;
import com.example.MapGame.repository.AudioRepository;
import com.example.MapGame.repository.ImageRepository;
import com.example.MapGame.repository.LandmarkRepository;
import com.example.MapGame.service.LandmarkService;
import org.springframework.stereotype.Service;

@Service
public class LandmarkServiceImpl implements LandmarkService {

    private final LandmarkRepository landmarkRepository;
    private final ImageRepository imageRepository;
    private final AudioRepository audioRepository;

    public LandmarkServiceImpl(LandmarkRepository landmarkRepository, ImageRepository imageRepository, AudioRepository audioRepository) {
        this.landmarkRepository = landmarkRepository;
        this.imageRepository = imageRepository;
        this.audioRepository = audioRepository;
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
            ImageEntity image = new ImageEntity(dto.getImage());
            AudioEntity audio = new AudioEntity(dto.getAudio());
            landmarkEntity = new LandmarkEntity(dto.getTitle(),
                    dto.getDescription(),dto.getStatus(),dto.getLatitude(), dto.getLongitude(),image, audio);
            imageRepository.save(image);
            audioRepository.save(audio);
        }
        landmarkRepository.save(landmarkEntity);
    }
}
