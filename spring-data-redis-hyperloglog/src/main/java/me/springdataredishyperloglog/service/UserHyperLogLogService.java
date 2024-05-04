package me.springdataredishyperloglog.service;

import lombok.RequiredArgsConstructor;
import me.springdataredishyperloglog.dto.UserDto;
import me.springdataredishyperloglog.util.DateTimeUtil;
import org.springframework.data.redis.core.HyperLogLogOperations;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;
import java.util.stream.IntStream;

@RequiredArgsConstructor
@Service
public class UserHyperLogLogService {
    private final StringRedisTemplate redisTemplate;
    private final String USER_HYPERLOGLOG_HOURLY_KEY = "user:hyperloglog:hourly";
    private final String USER_HYPERLOGLOG_DAILY_KEY = "user:hyperloglog:daily";

    public void logUser(UserDto user) {
        HyperLogLogOperations<String, String> hyperLogLogOperations = redisTemplate.opsForHyperLogLog();
        String key = getHourlyKey(user.getTimestamp());
        hyperLogLogOperations.add(key, user.getUserId());
    }

    public long getCardinality(String key) {
        return redisTemplate.opsForHyperLogLog().size(key);
    }

    public long mergeDailyCardinality(long timestamp) {
        String[] keys = IntStream.rangeClosed(0, 23)
                .mapToLong(i -> (long) (timestamp + i * 3600000L))
                .mapToObj(this::getHourlyKey)
                .toArray(String[]::new);
        return redisTemplate.opsForHyperLogLog().union(getDailyKey(timestamp), keys);
    }

    public String getHourlyKey(long timestamp) {
        return USER_HYPERLOGLOG_HOURLY_KEY + ":" + DateTimeUtil.timestampToZonedDateTime(timestamp, "yyyyMMddHH00", "+9");
    }

    public String getDailyKey(long timestamp) {
        return USER_HYPERLOGLOG_DAILY_KEY + ":" + DateTimeUtil.timestampToZonedDateTime(timestamp, "yyyyMMdd", "+9");
    }

    public byte[] getHyperLogLogBytes(String key) {
        return redisTemplate.dump(key);
    }

    public void restoreHyperLogLogBytes(String key, byte[] bytes) {
        redisTemplate.restore(key, bytes, 0, TimeUnit.SECONDS, false);
    }
}