package com.oos12.scansavvy.health.controller;

import com.oos12.scansavvy.health.model.EeveResponse;
import com.oos12.scansavvy.health.service.EeveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class EeveRestController {
    private final EeveService eeveService;

    @Autowired
    public EeveRestController(EeveService eeveService){
        this.eeveService = eeveService;
    }

    @GetMapping("api/v1/ai/generate")
    public ResponseEntity<EeveResponse> generate(
            @RequestParam(value = "promptMessage", defaultValue = "hello")
            String promptMessage){
        final EeveResponse aiResponse = eeveService.generateMessage(promptMessage);
        return ResponseEntity.status(HttpStatus.OK).body(aiResponse);
    }
    @GetMapping("api/v1/ai/generate/joke/{topic}")
    public ResponseEntity<EeveResponse> generateJoke(@PathVariable String topic) {
        final EeveResponse aiResponse = eeveService.generateJoke(topic);
        return ResponseEntity.status(HttpStatus.OK).body(aiResponse);
    }
}
