package me.secondservice;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequestMapping("/second-service")
@RestController
public class SecondServiceController {

    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome to the second service!";
    }

    @GetMapping("/message")
    public String message(@RequestHeader("first-request") String header) {
        log.info(header);
        return "Hello world in Second Service";
    }

    @GetMapping("/check")
    public String check() {
        return "Hi, there. This is a message form Second Service";
    }
}
