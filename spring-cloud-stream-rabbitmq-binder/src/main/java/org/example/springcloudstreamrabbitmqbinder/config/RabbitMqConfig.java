package org.example.springcloudstreamrabbitmqbinder.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;
import java.util.function.Consumer;

@Configuration
public class RabbitMqConfig {
    @Bean
    public Consumer<String> testConsumer() {
        return v -> System.out.println("testConsumer: " + v);
    }

    /**
     * inbound message를 조합하여 하나의 batch로 처리
     * @return
     */
    @Bean
    public Consumer<List<String>> testBatchConsumer() {
        return list -> list.forEach(v -> System.out.println("testBatchConsumer: " + v));
    }
}
