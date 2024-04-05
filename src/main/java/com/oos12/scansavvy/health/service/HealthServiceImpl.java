package com.oos12.scansavvy.health.service;

import com.oos12.scansavvy.health.model.Health;
import com.oos12.scansavvy.health.repository.HealthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HealthServiceImpl implements HealthService{
    @Autowired
    private HealthRepository healthRepository;

    @Override
    public List<Health> findAll(){ return healthRepository.findAll();}
}
