package me.userservice.vo;

import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.bind.ConstructorBinding;

@Getter
@ConfigurationProperties(prefix = "greeting")
public class Greeting {

    private final String message;

    @ConstructorBinding
    public Greeting(String message) {
        this.message = message;
    }

}
