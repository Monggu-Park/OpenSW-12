package com.oos12.scansavvy.health.controller;

import com.oos12.scansavvy.health.service.EeveServiceImpl;
import com.oos12.scansavvy.health.service.HealthServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class HealthController {
    @Autowired
    private HealthServiceImpl healthService;
    @Autowired
    private EeveServiceImpl eeveService;

    @Value("${naver.service.secretKey}")
    private String secretKey;
    @GetMapping("/naverOcr")
    public ResponseEntity<?> ocr() throws IOException{
        String fileName = "건강검진표 양식.png";
        File file = ResourceUtils.getFile("classpath:static/image/" + fileName);

        List<String> result = healthService.callApi("POST", file.getPath(), secretKey, "png");
        if (result != null){
            for (String s : result){
                log.info(s);
            }
        }else {
            log.info("null");
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @GetMapping("/upload-form")
    public String uploadForm() throws Exception{
        return "/upload-form";
    }
    @PostMapping("/uploadAndOcr")
    public String uploadAndOcr(@RequestParam("file") MultipartFile file, Model model) throws IOException {
        if (file.isEmpty()) {
            return "error";
        }

        String naverSecretKey = secretKey;
        File tempFile = File.createTempFile("temp", file.getOriginalFilename());
        file.transferTo(tempFile);
        List<String> result = healthService.callApi("POST", tempFile.getPath(), naverSecretKey, "png");
        tempFile.delete();
        model.addAttribute("ocrResult", result);
        return "ocr-result";
    }
}
