package org.example.springcloudstreamrabbitmqbinder.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.function.Consumer;

@Configuration
public class RabbitMqConfig {
    @Bean
    public Consumer<String> testConsumer() {
        return v -> System.out.println("testConsumer: " + v);
    }
}
