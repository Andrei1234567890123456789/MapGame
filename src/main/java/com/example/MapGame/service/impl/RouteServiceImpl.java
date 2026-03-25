package com.example.MapGame.service.impl;

import com.example.MapGame.model.dto.CreateRouteDTO;
import com.example.MapGame.model.dto.CreateRoutePointDTO;
import com.example.MapGame.model.entity.LandmarkEntity;
import com.example.MapGame.model.entity.RouteEntity;
import com.example.MapGame.model.entity.RoutePointEntity;
import com.example.MapGame.repository.LandmarkRepository;
import com.example.MapGame.repository.RouteRepository;
import com.example.MapGame.service.RouteService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class RouteServiceImpl implements RouteService {

    private final RouteRepository routeRepository;
    private final LandmarkRepository landmarkRepository;

    public RouteServiceImpl(RouteRepository routeRepository,
                            LandmarkRepository landmarkRepository) {
        this.routeRepository = routeRepository;
        this.landmarkRepository = landmarkRepository;
    }

    @Override
    @Transactional
    public Long createRoute(CreateRouteDTO dto) {

        System.out.println("Creating Route: " + dto.getName());
        for(CreateRoutePointDTO d : dto.getPoints()){
            System.out.println("     " + d.getLatitude() + " "+ d.getLongitude() + " " + d.getDirections());
        }

        // 1. Create Route
        RouteEntity route = new RouteEntity();
        route.setName(dto.getName());

        List<RoutePointEntity> points = new ArrayList<>();

        // 2. Map points with ordering
        for (int i = 0; i < dto.getPoints().size(); i++) {

            CreateRoutePointDTO pointDTO = dto.getPoints().get(i);

            RoutePointEntity point = new RoutePointEntity();
            point.setLatitude(pointDTO.getLatitude());
            point.setLongitude(pointDTO.getLongitude());
            point.setDirections(pointDTO.getDirections());
            point.setOrderPosition(i + 1); // IMPORTANT: ordering

            // 3. Handle landmark (if exists)
            if (pointDTO.getLandmarkId() != null) {
                LandmarkEntity landmark = landmarkRepository
                        .findById(pointDTO.getLandmarkId())
                        .orElseThrow(() -> new RuntimeException(
                                "Landmark not found with id: " + pointDTO.getLandmarkId()
                        ));

                point.setLandmark(landmark);
            }

            // 4. Set relationship
            point.setRoute(route);
            points.add(point);
        }

        // 5. Attach points to route
        route.setPoints(points);

        // 6. Save (cascade will persist points)
        RouteEntity savedRoute = routeRepository.save(route);

        return savedRoute.getId();
    }

    @Override
    public List<RouteEntity> getAllRoutes() {
        return routeRepository.findAll();
    }
}