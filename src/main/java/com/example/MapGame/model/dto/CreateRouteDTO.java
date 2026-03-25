package com.example.MapGame.model.dto;

import com.example.MapGame.model.entity.RoutePointEntity;

import java.util.List;

public class CreateRouteDTO {


    private String name;
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

    public CreateRouteDTO(String name, List<CreateRoutePointDTO> points) {
        this.name = name;
        this.points = points;
    }
}
