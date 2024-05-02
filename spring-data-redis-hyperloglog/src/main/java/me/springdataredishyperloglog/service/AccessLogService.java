package me.springdataredishyperloglog.service;

import lombok.RequiredArgsConstructor;
import me.springdataredishyperloglog.vo.User;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AccessLogService {
    private final StringRedisTemplate redisTemplate;

    public void log(User user) {
        redisTemplate.opsForHyperLogLog().add("");
    }

    public long count(String[] keys) {
        return redisTemplate.opsForHyperLogLog().size(keys);
    }
}
