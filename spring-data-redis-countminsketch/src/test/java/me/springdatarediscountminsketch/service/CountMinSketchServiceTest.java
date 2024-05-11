package me.springdatarediscountminsketch.service;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class CountMinSketchServiceTest {

    @Autowired
    private StringRedisTemplate redisTemplate;

    @Autowired
    private CountMinSketchService countMinSketchService;


    @Test
    void CMS_생성정보_확인() {
        // given
        redisTemplate.delete("testKey");
        String key = "testKey";
        Double rate = 0.008;
        Double probability = 0.001;
        String expected = "OK";

        // when
        Map<String, Long> result = countMinSketchService.info(key);

        // then
        // map result의 모든 값 확인
        assertThat(result).containsKeys("width", "depth", "count");

    }

    @Test
    void shouldInitializeByProbWithValidParameters() {
        // given
        redisTemplate.delete("testKey");
        String key = "testKey";
        Double rate = 0.00001;
        Double probability = 0.001;
        String expected = "OK";

        // when
        String result = countMinSketchService.initByProb(key, rate, probability);

        // then
        assertThat(result).isEqualTo(expected);
    }

    @Test
    void COUNT_MIN_SKETCH_빈도수_확인() {
        // given
        String sketchKey = "count:count-min-sketch";
        String sortedKey = "count:sorted-range";
        Double rate = 0.0007;
        Double probability = 0.0001;
        redisTemplate.delete(sketchKey);
        redisTemplate.delete(sortedKey);

        // Sorted Set Operations
        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();

        // count min sketch 초기화
        countMinSketchService.initByProb(sketchKey, 0.0007, 0.0001);
        String uuid = UUID.randomUUID().toString();
        var array = IntStream.rangeClosed(1, 1000)
                .mapToObj(i -> {
                    return IntStream.rangeClosed(1, (int) Math.floor(Math.random() * 3000 + 1))
                            .boxed()
                            .collect(Collectors.toMap(
                                    j -> uuid + j,
                                    j -> 1L,
                                    (a, b) -> a + b,
                                    HashMap::new
                            ));
                })
                .toArray(HashMap[]::new);

        long startMilli = Instant.now().toEpochMilli();
        Arrays.stream(array).forEach(arr -> {
            // count min sketch 사용시 2612ms
            countMinSketchService.incrBy(sketchKey, arr);
            // Sorted Set 사용시 561336ms
            arr.forEach((k, v) -> zSetOperations.incrementScore(sortedKey, (String) k, ((Long) v).doubleValue()));
        });
        long endMilli = Instant.now().toEpochMilli();
        System.out.println("Count Min Duration: " + (endMilli - startMilli) + "ms");


        List<Integer> collect = IntStream.rangeClosed(1, 10000).boxed()
                .filter(i -> {
                    Long value = countMinSketchService.query(sketchKey, uuid + i).stream().findFirst().orElseGet(() -> 0L);
                    Double score = Optional.of(zSetOperations.score(sortedKey, uuid + i)).orElseGet(() -> 0d);
                    if (value.doubleValue() != score.doubleValue()) {
                        System.out.println(uuid + i + " : " + value + " : " + score);
                    }
                    return value.doubleValue() != score.doubleValue();
                })
                .toList();
        System.out.println(collect);
    }


    @DisplayName("CountMinSketchService를 이용하여 조회가 정상적인지 테스트")//
    @Test
    void shouldQueryWithValidParameters() {
        // given
        String key = "testKey";
        String[] items = {"item1", "item2"};
        List<Long> expected = new ArrayList<>();
        expected.add(1L);
        expected.add(2L);

        // when
        List<Long> result = countMinSketchService.query(key, items);

        // then
        assertThat(result).isEqualTo(expected);
    }

}