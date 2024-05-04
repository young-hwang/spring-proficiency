package me.springdataredishyperloglog.service;

import lombok.RequiredArgsConstructor;
import me.springdataredishyperloglog.dto.UserDto;
import me.springdataredishyperloglog.util.DateTimeUtil;
import org.springframework.data.redis.core.HyperLogLogOperations;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@RequiredArgsConstructor
@Service
public class UserSetService {
    private final StringRedisTemplate redisTemplate;
    private final String USER_SET_HOURLY_KEY = "user:set:hourly";
    private final String USER_SET_DAILY_KEY = "user:set:daily";

    public void logUser(UserDto user) {
        SetOperations<String, String> setOperations = redisTemplate.opsForSet();
        String key = getHourlyKey(user.getTimestamp());
        setOperations.add(key, user.getUserId());
    }

    public long getCardinality(String key) {
        return redisTemplate.opsForSet().size(key);
    }

    public long mergeDailyCardinality(long timestamp) {
        List<String> keys = IntStream.rangeClosed(0, 23)
                .mapToLong(i -> (long) (timestamp + i * 3600000L))
                .mapToObj(this::getHourlyKey)
                .collect(Collectors.toList());
        return redisTemplate.opsForSet().unionAndStore(keys, getDailyKey(timestamp));
    }

    public String getHourlyKey(long timestamp) {
        return USER_SET_HOURLY_KEY + ":" + DateTimeUtil.timestampToZonedDateTime(timestamp, "yyyyMMddHH00", "+9");
    }

    public String getDailyKey(long timestamp) {
        return USER_SET_DAILY_KEY + ":" + DateTimeUtil.timestampToZonedDateTime(timestamp, "yyyyMMdd", "+9");
    }
}
