package com.oos12.scansavvy.health.service;

import com.oos12.scansavvy.health.model.Health;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

public interface HealthService {
    List<Health> findAll();
    List<String> callApi(String type, String filePath, String naver_secretKey,
                                String ext);
}
