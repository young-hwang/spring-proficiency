package me.springcorsbloomfilter.config;

import com.google.common.hash.BloomFilter;
import org.springframework.web.cors.CorsConfiguration;

public class BloomFilterCorsConfiguration extends CorsConfiguration {
    private BloomFilter<String> bloomFilter;

    public BloomFilterCorsConfiguration(BloomFilter<String> bloomFilter) {
        super();
        this.bloomFilter = bloomFilter;
    }

    @Override
    public String checkOrigin(String origin) {
        if (isAllowedOrigin(origin)) {
            return origin;
        }
        return null;
    }

    private boolean isAllowedOrigin(String origin) {
        // Bloom filter에서 허용된 origin 체크
        return this.bloomFilter.mightContain(origin);
    }

}
