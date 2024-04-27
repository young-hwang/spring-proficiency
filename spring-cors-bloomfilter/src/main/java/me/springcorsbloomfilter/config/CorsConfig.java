package me.springcorsbloomfilter.config;

import com.google.common.hash.BloomFilter;
import com.google.common.hash.Funnel;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.nio.charset.StandardCharsets;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new BloomFilterCorsConfiguration(whiteUrlBloomFilter());
        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

    @Bean
    public BloomFilter<String> whiteUrlBloomFilter() {
        Funnel<String> funnel = (from, into) -> {
            into.putString(from, StandardCharsets.UTF_8);
        };
        BloomFilter<String> bloomFilter = BloomFilter.create(funnel, 100_000, 0.01);
        return bloomFilter;
    }

}

