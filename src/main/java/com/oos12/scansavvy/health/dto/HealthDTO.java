package com.oos12.scansavvy.health.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString

public class HealthDTO {
    private String id;
    private String year;
    private String name;
    public HealthDTO(String id){
        this.id = id;
    }
}
