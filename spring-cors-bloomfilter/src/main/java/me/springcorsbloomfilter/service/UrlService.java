package me.springcorsbloomfilter.service;

import com.google.common.hash.BloomFilter;
import jakarta.annotation.Resource;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
public class UrlService {

    @Resource(name = "whiteUrlBloomFilter")
    private BloomFilter bloomFilter;

    public void addWhiteUrl(String url) {
        bloomFilter.put(url);
    }

    public boolean existUrl(String url) {
        return this.bloomFilter.mightContain(url);
    }

}
