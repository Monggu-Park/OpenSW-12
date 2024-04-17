package com.oos12.scansavvy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class ScanSavvyApplication {

    public static void main(String[] args) {
        SpringApplication.run(ScanSavvyApplication.class, args);
    }

}
