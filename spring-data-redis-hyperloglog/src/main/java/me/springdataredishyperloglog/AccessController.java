package me.springdataredishyperloglog;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class AccessController {

    private final StringRedisTemplate stringRedisTemplate;

    @PostMapping("/access")
    public void postUser(@RequestBody User user) {

        System.out.println("post user");
    }
}
