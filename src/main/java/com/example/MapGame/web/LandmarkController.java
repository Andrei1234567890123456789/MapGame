package com.example.MapGame.web;

import com.example.MapGame.model.entity.LandmarkEntity;
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

    public LandmarkController(LandmarkRepository landmarkRepository) {
        this.landmarkRepository = landmarkRepository;
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

    @GetMapping("/getLandmarks")
    @ResponseBody
    public List<LandmarkEntity> getAllLandmarks(){
        return landmarkRepository.findAll();
    }

    @GetMapping("/getLandmarks/{id}/image")
    @ResponseBody
    public ResponseEntity<byte[]> getImage(@PathVariable Long id){
        LandmarkEntity landmark = landmarkRepository.findById(id).orElseThrow();
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(landmark.getImage());
    }

    @GetMapping("/getLandmarks/{id}/audio")
    @ResponseBody
    public ResponseEntity<byte[]> getAudio(@PathVariable Long id){
        LandmarkEntity landmark = landmarkRepository.findById(id).orElseThrow();
        return ResponseEntity.ok()
                .contentType(MediaType.valueOf("audio/mpeg"))
                .body(landmark.getAudio());
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

        byte[] imageBytes = image.getBytes();
        byte[] audioBytes = audio.getBytes();

        LandmarkEntity landmark = new LandmarkEntity(
                title,
                description,
                status,
                latitude,
                longitude,
                imageBytes,
                audioBytes
        );

        landmarkRepository.save(landmark);

        return "redirect:/landmarks";
    }
}
