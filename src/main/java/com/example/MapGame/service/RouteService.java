package com.example.MapGame.service;

import com.example.MapGame.model.dto.CreateRouteDTO;
import com.example.MapGame.model.entity.RouteEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RouteService {

    Long createRoute(CreateRouteDTO dto);

    List<RouteEntity> getAllRoutes();
}
