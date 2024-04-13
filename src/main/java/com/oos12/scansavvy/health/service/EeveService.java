package com.oos12.scansavvy.health.service;

import com.oos12.scansavvy.health.model.EeveResponse;

public interface EeveService {
    EeveResponse generateMessage(String prompt);
    EeveResponse generateJoke(String topic);
}
