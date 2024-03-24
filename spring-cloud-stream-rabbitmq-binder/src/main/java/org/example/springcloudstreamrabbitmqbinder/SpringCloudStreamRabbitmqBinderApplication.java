package org.example.springcloudstreamrabbitmqbinder;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SpringCloudStreamRabbitmqBinderApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringCloudStreamRabbitmqBinderApplication.class, args);
	}

	@Bean
	public ApplicationRunner runner(RabbitTemplate template) {
		return args -> {
			template.convertAndSend("test-batch-exchange", "test-batch-key", "test-batch");
			template.convertAndSend("test-batch-exchange","test-batch-key", "test-batch");
		};
	}

}
