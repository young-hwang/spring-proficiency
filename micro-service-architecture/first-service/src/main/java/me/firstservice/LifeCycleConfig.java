package me.firstservice;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class LifeCycleConfig {

    @Bean(initMethod = "init", destroyMethod = "close")
    public LifeCycleTest lifeCycleTest() {
        return new LifeCycleTest();
    }

}
