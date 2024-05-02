package me.springcorsbloomfilter.controller;

import com.google.common.hash.BloomFilter;
import jakarta.annotation.Resource;
import lombok.RequiredArgsConstructor;
import me.springcorsbloomfilter.service.UrlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class UrlController {
    private final UrlService urlService;

    @PostMapping("/url")
    public ResponseEntity<String> postTest(@RequestBody UrlModel url) {
        urlService.addWhiteUrl(url.getUrl());
        return ResponseEntity.ok("added url " + url.getUrl() );
    }
}
