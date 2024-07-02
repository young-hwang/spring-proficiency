package me.springmvckotlin

import org.springframework.boot.Banner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class SpringMvcKotlinApplication

fun main(args: Array<String>) {
	runApplication<SpringMvcKotlinApplication>(*args) {
		setBannerMode(Banner.Mode.OFF)
	}
}
