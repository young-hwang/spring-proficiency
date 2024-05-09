package me.springdatarediscountminsketch.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

@Slf4j
@RequiredArgsConstructor
@Service
public class CountMinSketchService {

    private final StringRedisTemplate redisTemplate;

    public Map<String, Long> info(String key) {
        byte[] keyBytes = key.getBytes(StandardCharsets.UTF_8);
            return redisTemplate.execute((RedisCallback<Map<String, Long>>) connection -> {
                List<?> temp = (List<?>) connection.commands().execute(CountMinSketchCommand.INFO.getCommand(), keyBytes);
                Map<String, Long> result = new HashMap<>();
                if (temp == null) {
                    return result;
                }
                result.put(new String((byte[]) temp.get(0), StandardCharsets.UTF_8), (Long) temp.get(1));
                result.put(new String((byte[]) temp.get(2), StandardCharsets.UTF_8), (Long) temp.get(3));
                result.put(new String((byte[]) temp.get(4), StandardCharsets.UTF_8), (Long) temp.get(5));
                return result;
            });
    }

    public String initByProb(String key, Double rate, Double probability) {
        byte[] keyBytes = key.getBytes(StandardCharsets.UTF_8);
        byte[] rateBytes = String.valueOf(rate).getBytes(StandardCharsets.UTF_8);
        byte[] probabilityBytes = String.valueOf(probability).getBytes(StandardCharsets.UTF_8);

        return redisTemplate.execute((RedisCallback<String>) connection -> {
            Object result = connection.commands().execute(CountMinSketchCommand.INITBYPROB.getCommand(), keyBytes, rateBytes, probabilityBytes);
            return new String((byte[]) result, StandardCharsets.UTF_8);
        });
    }

    public List<Long> incrBy(String key, Map<String, Long> itemIncrements) {
        byte[] keyBytes = key.getBytes(StandardCharsets.UTF_8);
        byte[][] itemIncrementBytes = itemIncrements.entrySet().stream()
                .flatMap(e -> Stream.of(e.getKey().getBytes(StandardCharsets.UTF_8), String.valueOf(e.getValue()).getBytes(StandardCharsets.UTF_8)))
                .toArray(byte[][]::new);
        byte[][] params = new byte[itemIncrementBytes.length + 1][];
        params[0] = keyBytes;
        System.arraycopy(itemIncrementBytes, 0, params, 1, itemIncrementBytes.length);

        return redisTemplate.execute((RedisCallback<List<Long>>) connection -> {
            List<?> temp =  (List<?>) connection.commands().execute(CountMinSketchCommand.INCRBY.getCommand(), params);
            List<Long> result = new ArrayList<>();
            if (temp != null) {
                temp.forEach(t -> {
                    if (t instanceof byte[]) {
                        result.add(Long.parseLong(new String((byte[]) t, StandardCharsets.UTF_8)));
                    } else {
                        result.add((Long) t);
                    }
                });
            }
            return result;
        });
    }

    public List<Long> query(String key, String... items) {
        byte[] keyBytes = key.getBytes(StandardCharsets.UTF_8);
        byte[][] itemBytes = Stream.of(items)
                .map(s -> s.getBytes(StandardCharsets.UTF_8))
                .toArray(byte[][]::new);
        byte[][] params = new byte[itemBytes.length + 1][];
        params[0] = keyBytes;
        System.arraycopy(itemBytes, 0, params, 1, itemBytes.length);

        return redisTemplate.execute((RedisCallback<List<Long>>) connection -> {
            List<?> temp =  (List<?>) connection.commands().execute(CountMinSketchCommand.QUERY.getCommand(), params);
            List<Long> result = new ArrayList<>();
            if (temp != null) {
                temp.forEach(t -> {
                    if (t instanceof byte[]) {
                        result.add(Long.parseLong(new String((byte[]) t, StandardCharsets.UTF_8)));
                    } else {
                        result.add((Long) t);
                    }
                });
            }
            return result;
        });
    }

}
