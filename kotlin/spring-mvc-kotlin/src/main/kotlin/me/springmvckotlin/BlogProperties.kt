package me.springmvckotlin

import org.springframework.boot.context.properties.ConfigurationProperties

@ConfigurationProperties(prefix = "blog")
class BlogProperties (val title: String, val banner: Banner){
    data class Banner(val title: String? = null, val content: String)
}
