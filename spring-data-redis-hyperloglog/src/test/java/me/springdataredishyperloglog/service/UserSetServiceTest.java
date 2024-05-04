package me.springdataredishyperloglog.service;

import me.springdataredishyperloglog.dto.UserDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.StringRedisTemplate;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.stream.IntStream;


@SpringBootTest
class UserSetServiceTest {

    @Autowired
    private UserSetService userSetService;

    @Autowired
    private StringRedisTemplate redisTemplate;

    @BeforeEach
    void setUp() {
//        redisTemplate.getConnectionFactory().getConnection().flushAll();
    }

    @Test
    void testLogUserAndHourlyCardinality() {
        // Given
        Long currentTime = System.currentTimeMillis();

        // When
        IntStream.rangeClosed(1, 100000).forEach(i -> {
            userSetService.logUser(new UserDto("user" + i, currentTime));
        });

        // Then
        long currentCardinality = userSetService.getCardinality(userSetService.getHourlyKey(currentTime));
        System.out.println("currentCardinality = " + currentCardinality);
    }

    @Test
    void testLogUserAndDailyCardinality() {
        // Given
        LocalDateTime localDateTime = LocalDateTime.of(2024, 5, 4, 0, 0, 0);
        ZonedDateTime zonedDateTime = ZonedDateTime.of(localDateTime, ZoneId.of("Asia/Seoul"));
        long timestamp = zonedDateTime.toInstant().toEpochMilli();

        // When
        IntStream.rangeClosed(0, 23).forEach(i -> {
            IntStream.rangeClosed(1, 100000).forEach(j -> {
                int idx = (i * 50000) + j;
                userSetService.logUser(new UserDto("user" + idx, timestamp + i * 3600000L));
            });
        });


        Instant startBloom = Instant.now();
        userSetService.mergeDailyCardinality(timestamp);
        Instant endBloom = Instant.now();
        System.out.println("Duration: " + (endBloom.toEpochMilli() - startBloom.toEpochMilli()) + "ms");

        // Then
        long hourlyCardinality = userSetService.getCardinality(userSetService.getHourlyKey(timestamp));
        System.out.println("hourlyCardinality = " + hourlyCardinality);

        long currentCardinality = userSetService.getCardinality(userSetService.getDailyKey(timestamp));
        System.out.println("currentCardinality = " + currentCardinality);
        //Duration: 917ms
        //hourlyCardinality = 100000
        //currentCardinality = 1250000

        // daily 85165960 bytes = 85.17mb
        // hourly 6373000 bytes = 6.37mb
    }
}