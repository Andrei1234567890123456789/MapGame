package com.example.MapGame.model.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "routes")
public class RouteEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @Column(nullable = false, length = 2000)
    private String description;

    @JsonManagedReference
    @OneToMany(mappedBy = "route", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("orderPosition ASC")
    private List<RoutePointEntity> points = new ArrayList<>();

    public RouteEntity() {
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public RouteEntity(String name, String description, List<RoutePointEntity> points) {
        this.name = name;
        this.description = description;
        this.points = points;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<RoutePointEntity> getPoints() {
        return points;
    }

    public void setPoints(List<RoutePointEntity> points) {
        this.points = points;
    }
}
