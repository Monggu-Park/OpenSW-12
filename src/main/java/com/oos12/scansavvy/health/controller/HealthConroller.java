package com.oos12.scansavvy.health.controller;

import com.oos12.scansavvy.health.service.HealthServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthConroller {
    @Autowired
    private HealthServiceImpl healthService;

}
