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

import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest
class UserHyperLogLogServiceTest {

    @Autowired
    private UserHyperLogLogService userHyperLogLogService;

    @Autowired
    private StringRedisTemplate redisTemplate;

    @BeforeEach
    void setUp() {
//        redisTemplate.getConnectionFactory().getConnection().flushAll();
    }

    @Test
    void testLogUserAndHourlyCardinality() {
        // Given
        LocalDateTime localDateTime = LocalDateTime.of(2024, 5, 4, 0, 0, 0);
        ZonedDateTime zonedDateTime = ZonedDateTime.of(localDateTime, ZoneId.of("Asia/Seoul"));
        long currentTime = zonedDateTime.toInstant().toEpochMilli();

        // When
        IntStream.rangeClosed(1, 100000).forEach(i -> {
            userHyperLogLogService.logUser(new UserDto("user" + i, currentTime));
        });

        // Then
        long currentCardinality = userHyperLogLogService.getCardinality(userHyperLogLogService.getHourlyKey(currentTime));
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
                userHyperLogLogService.logUser(new UserDto("user" + idx, timestamp + i * 3600000L));
            });
        });


        Instant startBloom = Instant.now();
        userHyperLogLogService.mergeDailyCardinality(timestamp);
        Instant endBloom = Instant.now();
        System.out.println("Duration: " + (endBloom.toEpochMilli() - startBloom.toEpochMilli()) + "ms");

        // Then
        long hourlyCardinality = userHyperLogLogService.getCardinality(userHyperLogLogService.getHourlyKey(timestamp));
        System.out.println("hourlyCardinality = " + hourlyCardinality);

        long currentCardinality = userHyperLogLogService.getCardinality(userHyperLogLogService.getDailyKey(timestamp));
        System.out.println("currentCardinality = " + currentCardinality);
        // Duration: 14ms
        // hourlyCardinality = 99725 (100000)
        // currentCardinality = 1257479 (1250000)
        //memory size 12392
    }

    @Test
    void testHyperLogLogSerializable() {
        // Given
        LocalDateTime localDateTime = LocalDateTime.of(2024, 5, 4, 0, 0, 0);
        ZonedDateTime zonedDateTime = ZonedDateTime.of(localDateTime, ZoneId.of("Asia/Seoul"));
        long currentTime = zonedDateTime.toInstant().toEpochMilli();
        String key  = userHyperLogLogService.getDailyKey(currentTime) + ":back";

        // When
        byte[] hyperLogLogBytes = userHyperLogLogService.getHyperLogLogBytes(userHyperLogLogService.getDailyKey(currentTime));
        userHyperLogLogService.restoreHyperLogLogBytes(key, hyperLogLogBytes);

        // Then
        long currentCardinality = userHyperLogLogService.getCardinality(key);
        System.out.println("currentCardinality = " + currentCardinality);
    }
}