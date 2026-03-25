package com.example.MapGame.model.dto;

import com.example.MapGame.model.entity.LandmarkEntity;
import com.example.MapGame.model.entity.RouteEntity;

public class CreateRoutePointDTO {

    private double latitude;
    private double longitude;
    private String directions;

    private Long landmarkId;

    public CreateRoutePointDTO(double latitude, double longitude, String directions, Long landmarkId) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.directions = directions;
        this.landmarkId = landmarkId;
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

    public String getDirections() {
        return directions;
    }

    public void setDirections(String directions) {
        this.directions = directions;
    }

    public Long getLandmarkId() {
        return landmarkId;
    }

    public void setLandmarkId(Long landmarkId) {
        this.landmarkId = landmarkId;
    }
}
