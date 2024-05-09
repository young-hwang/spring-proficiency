package me.springdataredishyperloglog;

import me.springdataredishyperloglog.dto.UserDto;
import me.springdataredishyperloglog.util.DateTimeUtil;
import org.apache.tomcat.util.codec.binary.Base64;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.HyperLogLogOperations;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.concurrent.TimeUnit;
import java.util.stream.IntStream;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class RedisHyperLogLogTest {
    @Autowired
    private StringRedisTemplate redisTemplate;
    private static final String USER_HYPERLOGLOG_HOURLY_KEY = "test:hyperloglog:hourly";
    private static final String USER_HYPERLOGLOG_DAILY_KEY = "test:hyperloglog:daily";

    @BeforeEach
    void setUp() {
        redisTemplate.delete(getHourlyKey(getCurrentTimestamp()));
    }

    @Test
    void testHyperLogLogErrorRate() {
        // Given
        long currentTimestamp = getCurrentTimestamp();
        HyperLogLogOperations<String, String> hyperLogLogOperations = redisTemplate.opsForHyperLogLog();
        int limit = 10000000;
        IntStream.rangeClosed(1, limit).forEach(i -> {
            hyperLogLogOperations.add(getHourlyKey(currentTimestamp), "user" + i);
        });
        // When
        long currentCardinality = hyperLogLogOperations.size(getHourlyKey(currentTimestamp));
        // Then
        // 100000 * 0.01 = 1000 (1% error rate)
        assertThat(currentCardinality).isBetween((long) (limit - limit * (0.01)), (long) (limit + limit * (0.01)));
    }

    @Test
    void testHyperLogLogMerge() {
        // Given
        long currentTimestamp = getCurrentTimestamp();
        HyperLogLogOperations<String, String> hyperLogLogOperations = redisTemplate.opsForHyperLogLog();
        int limit = 100000;
        String[] candidateKeys = getMergeCandidateKeys(currentTimestamp);

//        IntStream.rangeClosed(0, 23).forEach(i -> {
//            IntStream.rangeClosed(1, limit).forEach(j -> {
//                int idx = (i * limit / 2) + j;
//                hyperLogLogOperations.add(getHourlyKey(currentTimestamp + i * 3600000L), "user" + idx);
//            });
//        });

        // When
        long startMilli = Instant.now().toEpochMilli();
        long mergeCardinality = hyperLogLogOperations.union(getDailyKey(currentTimestamp), candidateKeys);
        long endMilli = Instant.now().toEpochMilli();
        System.out.println("merge time: " + (endMilli - startMilli) + "ms");

        // Then
        assertThat(mergeCardinality).isEqualTo(hyperLogLogOperations.size(candidateKeys));
    }


    @Test
    void testGetDumpAndRestore() {
        // given
        HyperLogLogOperations<String, String> hyperLogLogOperations = redisTemplate.opsForHyperLogLog();
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        long currentTimestamp = getCurrentTimestamp();
        byte[] dump = redisTemplate.dump(getDailyKey(currentTimestamp));
        // when
        valueOperations.set("test:dump", Base64.encodeBase64String(dump));
        String s = valueOperations.get("test:dump");
        redisTemplate.restore(getDailyKey(currentTimestamp) + ":restore", Base64.decodeBase64(s), 0, TimeUnit.MILLISECONDS, false);
        long restoreCardinality = hyperLogLogOperations.size(getDailyKey(currentTimestamp) + ":restore");
        // then
        assertThat(restoreCardinality).isEqualTo(hyperLogLogOperations.size(getDailyKey(currentTimestamp)));
    }

    private long getCurrentTimestamp() {
        LocalDateTime localDateTime = LocalDateTime.of(2024, 5, 4, 0, 0, 0);
        ZonedDateTime zonedDateTime = ZonedDateTime.of(localDateTime, ZoneId.of("Asia/Seoul"));
        return zonedDateTime.toInstant().toEpochMilli();
    }

    public String getHourlyKey(long timestamp) {
        return USER_HYPERLOGLOG_HOURLY_KEY + ":" + DateTimeUtil.timestampToZonedDateTime(timestamp, "yyyyMMddHH00", "+9");
    }

    public String getDailyKey(long timestamp) {
        return USER_HYPERLOGLOG_DAILY_KEY + ":" + DateTimeUtil.timestampToZonedDateTime(timestamp, "yyyyMMdd", "+9");
    }

    public String[] getMergeCandidateKeys(long timestamp) {
        return IntStream.rangeClosed(0, 23)
                .mapToLong(i -> (long) (timestamp + i * 3600000L))
                .mapToObj(this::getHourlyKey)
                .toArray(String[]::new);
    }
}
