package com.oos12.scansavvy.health.model;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class EeveResponse {
    private String message;
}
