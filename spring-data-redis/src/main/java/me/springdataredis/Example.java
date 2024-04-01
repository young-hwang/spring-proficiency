package me.springdataredis;

import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.connection.StringRedisConnection;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.net.URL;

@Component
public class Example {
    @Autowired
    private RedisOperations<String, String> redisOperations;

    @Resource(name = "redisTemplate")
    private ListOperations<String, String> listOps;

    public void addLink(String userId, String url) {
        listOps.leftPush(userId, url);
    }

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    public void addLink(String userId, URL url) {
        stringRedisTemplate.opsForList().leftPush(userId, url.toExternalForm());
    }


    public void useCallback() {
        redisOperations.execute(new RedisCallback<Object>() {
            @Override
            public Object doInRedis(RedisConnection connection) throws DataAccessException {
                Long size = connection.dbSize();
                ((StringRedisConnection) connection).set("key", "value");
                return size;
            }
        });
    }
}

