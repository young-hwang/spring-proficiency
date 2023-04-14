package io.github.younghwang.dynamicdatasourcerouting;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
public class DynamicDatasourceRoutingApplication {

	public static void main(String[] args) {
		SpringApplication.run(DynamicDatasourceRoutingApplication.class, args);
	}

}
