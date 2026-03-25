package com.example.MapGame.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.yaml.snakeyaml.events.Event;

@Entity
@Table(name = "route_points")
public class RoutePointEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private double latitude;

    @Column(nullable = false)
    private double longitude;

    @Column(nullable = false)
    private int orderPosition;

    @Column(length = 1000, nullable = true)
    private String directions;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "route_id")
    private RouteEntity route;

    @ManyToOne
    @JoinColumn(name = "landmark_id")
    private LandmarkEntity landmark;

    public RoutePointEntity() {
    }

    public RoutePointEntity(double latitude, double longitude, int orderPosition, String directions, RouteEntity route, LandmarkEntity landmark) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.orderPosition = orderPosition;
        this.directions = directions;
        this.route = route;
        this.landmark = landmark;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public int getOrderPosition() {
        return orderPosition;
    }

    public void setOrderPosition(int orderPosition) {
        this.orderPosition = orderPosition;
    }

    public String getDirections() {
        return directions;
    }

    public void setDirections(String directions) {
        this.directions = directions;
    }

    public RouteEntity getRoute() {
        return route;
    }

    public void setRoute(RouteEntity route) {
        this.route = route;
    }

    public LandmarkEntity getLandmark() {
        return landmark;
    }

    public void setLandmark(LandmarkEntity landmark) {
        this.landmark = landmark;
    }
}
