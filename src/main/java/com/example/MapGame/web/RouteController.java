package com.example.MapGame.web;

import com.example.MapGame.model.dto.CreateRouteDTO;
import com.example.MapGame.model.entity.LandmarkEntity;
import com.example.MapGame.model.entity.RouteEntity;
import com.example.MapGame.service.RouteService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Controller
@RequestMapping("/routes")
public class RouteController {

    private final RouteService routeService;

    public RouteController(RouteService routeService) {
        this.routeService = routeService;
    }

    @GetMapping("/all")
    @ResponseBody
    public List<RouteEntity> getAllRoutes() {
        return routeService.getAllRoutes();
    }

    @PostMapping("/create")
    public String createRoute(@RequestBody CreateRouteDTO routeCreateDTO) {

        routeService.createRoute(routeCreateDTO);

        return "redirect:/landmarks";
    }
}
