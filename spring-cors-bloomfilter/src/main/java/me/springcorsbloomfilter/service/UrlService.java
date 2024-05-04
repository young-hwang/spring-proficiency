package me.springcorsbloomfilter.service;

import com.google.common.hash.BloomFilter;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

@Service
public class UrlService {

    @Resource(name = "whiteUrlBloomFilter")
    private BloomFilter bloomFilter;

    public boolean addWhiteUrl(String url) {
        return bloomFilter.put(url);
    }

    public boolean existUrl(String url) {
        return this.bloomFilter.mightContain(url);
    }

}
