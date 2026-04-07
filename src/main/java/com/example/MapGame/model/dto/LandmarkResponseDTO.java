package com.example.MapGame.model.dto;

import com.example.MapGame.model.entity.LandmarkEntity;

public class LandmarkResponseDTO {

    private Long landmarkId;
    private String title;
    private String description;
    private String status;
    private double latitude;
    private double longitude;

    private Long imageId;
    private Long audioId;

    // constructor
    public LandmarkResponseDTO(LandmarkEntity l) {
        this.landmarkId = l.getLandmarkId();
        this.title = l.getTitle();
        this.description = l.getDescription();
        this.status = l.getStatus();
        this.latitude = l.getLatitude();
        this.longitude = l.getLongitude();

        this.imageId = l.getImageEntity() != null ? l.getImageEntity().getId() : null;
        this.audioId = l.getAudioEntity() != null ? l.getAudioEntity().getId() : null;
    }

    public Long getLandmarkId() {
        return landmarkId;
    }

    public void setLandmarkId(Long landmarkId) {
        this.landmarkId = landmarkId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public Long getImageId() {
        return imageId;
    }

    public void setImageId(Long imageId) {
        this.imageId = imageId;
    }

    public Long getAudioId() {
        return audioId;
    }

    public void setAudioId(Long audioId) {
        this.audioId = audioId;
    }
    // getters
}