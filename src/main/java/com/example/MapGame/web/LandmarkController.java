package com.example.MapGame.web;

import com.example.MapGame.model.dto.LandmarkResponseDTO;
import com.example.MapGame.model.entity.AudioEntity;
import com.example.MapGame.model.entity.ImageEntity;
import com.example.MapGame.model.entity.LandmarkEntity;
import com.example.MapGame.repository.AudioRepository;
import com.example.MapGame.repository.ImageRepository;
import com.example.MapGame.repository.LandmarkRepository;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Controller
public class LandmarkController {

    private final LandmarkRepository landmarkRepository;
    private final ImageRepository imageRepository;
    private final AudioRepository audioRepository;

    public LandmarkController(LandmarkRepository landmarkRepository, ImageRepository imageRepository, AudioRepository audioRepository) {
        this.landmarkRepository = landmarkRepository;
        this.imageRepository = imageRepository;
        this.audioRepository = audioRepository;
    }

    @GetMapping
    public String openIntro(){
        return "intro";
    }

    @GetMapping("/landmarks")
    public String openMainPage(){
        return "index";
    }
    @GetMapping("/creator-form")
    public String openCreationForm(){
        return "landmark-creation-form";
    }

    @GetMapping("/route-creator-form")
    public String openRouteCreationForm(){
        return "route-creation-form";
    }

//    @GetMapping("/getLandmarks")
//    @ResponseBody
//    public List<LandmarkEntity> getAllLandmarks(){
//        return landmarkRepository.findAll();
//    }

    @GetMapping("/getLandmarks")
    @ResponseBody
    public List<LandmarkResponseDTO> getAllLandmarks(){
        return landmarkRepository.findAll()
                .stream()
                .map(LandmarkResponseDTO::new)
                .toList();
    }

//    @GetMapping("/getLandmarks/{id}/image")
//    @ResponseBody
//    public ResponseEntity<byte[]> getImage(@PathVariable Long id){
//        LandmarkEntity landmark = landmarkRepository.findById(id).orElseThrow();
//        return ResponseEntity.ok()
//                .contentType(MediaType.IMAGE_JPEG)
//                .body(landmark.getImageEntity().getImage());
//    }

//    @GetMapping("/getLandmarks/{id}/audio")
//    @ResponseBody
//    public ResponseEntity<byte[]> getAudio(@PathVariable Long id){
//        LandmarkEntity landmark = landmarkRepository.findById(id).orElseThrow();
//        return ResponseEntity.ok()
//                .contentType(MediaType.valueOf("audio/mpeg"))
//                .body(landmark.getAudioEntity().getAudio());
//    }

    @GetMapping("/images/{id}")
    @ResponseBody
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
        ImageEntity image = imageRepository.findById(id).orElseThrow();

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(image.getImage());
    }

    @GetMapping("/audio/{id}")
    @ResponseBody
    public ResponseEntity<byte[]> getAudio(@PathVariable Long id) {
        AudioEntity audio = audioRepository.findById(id).orElseThrow();

        return ResponseEntity.ok()
                .contentType(MediaType.valueOf("audio/mpeg"))
                .body(audio.getAudio());
    }

    @PostMapping("/createLandmark")
    public String createLandmark(
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam String status,
            @RequestParam double latitude,
            @RequestParam double longitude,
            @RequestParam MultipartFile image,
            @RequestParam MultipartFile audio) throws IOException {

        ImageEntity imageEntity = new ImageEntity();
        imageEntity.setImage(image.getBytes());

        AudioEntity audioEntity = new AudioEntity();
        audioEntity.setAudio(audio.getBytes());

        imageRepository.save(imageEntity);
        audioRepository.save(audioEntity);

        LandmarkEntity landmark = new LandmarkEntity();
        landmark.setTitle(title);
        landmark.setDescription(description);
        landmark.setStatus(status);
        landmark.setLatitude(latitude);
        landmark.setLongitude(longitude);

        landmark.setImageEntity(imageEntity);
        landmark.setAudioEntity(audioEntity);

        landmarkRepository.save(landmark);

        return "redirect:/landmarks";
    }
}
