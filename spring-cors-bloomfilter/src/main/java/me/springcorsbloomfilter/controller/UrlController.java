package me.springcorsbloomfilter.controller;

import com.google.common.hash.BloomFilter;
import jakarta.annotation.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UrlController {

    @Resource(name = "whiteUrlBloomFilter")
    private BloomFilter<String> bloomFilter;

    @PostMapping("/url")
    public ResponseEntity<String> postTest(@RequestBody UrlModel model) {
        bloomFilter.put(model.getUrl());
        return ResponseEntity.ok("added url " + model.getUrl() );
    }
}
