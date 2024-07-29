package me.springmvckotlin

import org.springframework.boot.Banner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.boot.runApplication

@SpringBootApplication
@EnableConfigurationProperties(BlogProperties::class)
class SpringMvcKotlinApplication

fun main(args: Array<String>) {
	runApplication<SpringMvcKotlinApplication>(*args) {
		setBannerMode(Banner.Mode.OFF)
	}
}
