package me.springcorsbloomfilter.controller;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class RequestController {

    @PostMapping("/test")
    public ResponseEntity<String> postRequest(HttpServletResponse response) {
        return ResponseEntity.ok("post request");
    }

    @GetMapping("/test")
    public ResponseEntity<String> getRequest() {
        return ResponseEntity.ok("get request");
    }
}
