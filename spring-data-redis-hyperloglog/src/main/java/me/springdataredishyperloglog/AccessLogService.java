package me.springdataredishyperloglog;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AccessLogService {
    private final StringRedisTemplate redisTemplate;

    public void log(String key, String userId) {
        redisTemplate.opsForHyperLogLog().add(key, userId);
    }

    public long count(String[] keys) {
        return redisTemplate.opsForHyperLogLog().size(keys);
    }
}
