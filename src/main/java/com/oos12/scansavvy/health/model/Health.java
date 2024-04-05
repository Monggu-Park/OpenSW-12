package com.oos12.scansavvy.health.model;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "health")
public class Health {
    @Id
    private String id;
    @NotBlank
    @Size(max = 10)
    private String name;
}
