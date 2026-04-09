package com.example.MapGame.model.dto;

import java.util.List;

public class CreateRouteDTO {


    private String name;
    private String description;
    private List<CreateRoutePointDTO> points;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<CreateRoutePointDTO> getPoints() {
        return points;
    }

    public void setPoints(List<CreateRoutePointDTO> points) {
        this.points = points;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public CreateRouteDTO(String name, String description, List<CreateRoutePointDTO> points) {
        this.name = name;
        this.description = description;
        this.points = points;
    }
}
