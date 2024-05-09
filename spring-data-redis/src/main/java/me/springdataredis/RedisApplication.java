package me.springdataredis;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.UnifiedJedis;

import java.util.List;

@Slf4j
public class RedisApplication {
    public static void main(String[] args) {
        RedisStandaloneConfiguration configuration = new RedisStandaloneConfiguration();
        configuration.setHostName("localhost");
        configuration.setPort(6379);
        configuration.setDatabase(0);

//        LettuceConnectionFactory connectionFactory = new LettuceConnectionFactory(configuration);
        JedisConnectionFactory connectionFactory = new JedisConnectionFactory(configuration);
        connectionFactory.start();

        RedisTemplate<String, String> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);
		template.setDefaultSerializer(StringRedisSerializer.UTF_8);
		template.afterPropertiesSet();

		template.opsForValue().set("foo", "bar");

        Jedis jedis = (Jedis) connectionFactory.getConnection().getNativeConnection();
        UnifiedJedis pool = new UnifiedJedis(jedis.getConnection());
        // Count-Min Sketch 생성
        pool.cmsInitByProb("cms:heatmap", 0.008d, 0.001d);

        // Count-Min Sketch에 데이터 추가
        pool.cmsIncrBy("cms:heatmap", "202405040000:0", 1);

        // Count-Min Sketch에 데이터 조회
        List<Long> counts = pool.cmsQuery("cms:heatmap", "202405040000:0");
        counts.forEach(System.out::println);


//        IntStream.range(1, 990000).forEach(i -> {
//            System.out.println(String.valueOf(i));
//            pool.sadd("resource:set", "$2b$05$bFJ.EtW3cE5Lm.whhm81uOx0lYuKzos4OmYsC5pv0A6cel.LO4xMO^#1U8389ATPE/szowZGlK27A==:http://www.google.com" + i);
//        });
//        pool.bfReserve("resource:filter", 0.00001, 1000000);
//        pool.bfAdd("resource:filter", "$2b$05$bFJ.EtW3cE5Lm.whhm81uOx0lYuKzos4OmYsC5pv0A6cel.LO4xMO^#1U8389ATPE/szowZGlK27A==:http://www.google.com");
//        boolean b = pool.bfExists("resource:filter", "$2b$05$bFJ.EtW3cE5Lm.whhm81uOx0lYuKzos4OmYsC5pv0A6cel.LO4xMO^#1U8389ATPE/szowZGlK27A==:http://www.google.com");
//        pool.close();
//        System.out.println(System.currentTimeMillis());
//        System.out.println("result " + b);

//        try (Jedis jedis = pool.getResource()) {
//            // Store & Retrieve a simple string
//            jedis.set("foo", "bar");
//            System.out.println(jedis.get("foo")); // prints bar
//
//            // Store & Retrieve a HashMap
//            Map<String, String> hash = new HashMap<>();;
//            hash.put("name", "John");
//            hash.put("surname", "Smith");
//            hash.put("company", "Redis");
//            hash.put("age", "29");
//            jedis.hset("user-session:123", hash);
//            System.out.println(jedis.hgetAll("user-session:123"));
//            // Prints: {name=John, surname=Smith, company=Redis, age=29}
//        }
//        template.execute((RedisCallback<Object>) connection -> {
//            connection.commands().execute("BF.RESERVE", "resource:filter".getBytes(StandardCharsets.UTF_8), "0.00001".getBytes(StandardCharsets.UTF_8), "1000000".getBytes(StandardCharsets.UTF_8));
//            return null;
//        });
//
//        template.execute((RedisCallback<Integer>) connection -> {
//            Integer obj = (Integer) connection.commands().execute("BF.ADD","resource:filter".getBytes(StandardCharsets.UTF_8), "$2b$05$bFJ.EtW3cE5Lm.whhm81uOx0lYuKzos4OmYsC5pv0A6cel.LO4xMO^#1U8389ATPE/szowZGlK27A==:http://www.google.com".getBytes(StandardCharsets.UTF_8));
//            return null;
//        });

//        var nativeConnection = connectionFactory.getConnection();
//        nativeConnection.commands().execute("BF.RESERVE", "resource:filter".getBytes(StandardCharsets.UTF_8), "0.00001".getBytes(StandardCharsets.UTF_8), "1000000".getBytes(StandardCharsets.UTF_8));
//        Object obj = nativeConnection.commands().execute("BF.ADD","resource:filter".getBytes(StandardCharsets.UTF_8), "$2b$05$bFJ.EtW3cE5Lm.whhm81uOx0lYuKzos4OmYsC5pv0A6cel.LO4xMO^#1U8389ATPE/szowZGlK27A==:http://www.google.com".getBytes(StandardCharsets.UTF_8));

        log.info("Value at foo: " + "bar");
        connectionFactory.destroy();
    }
}
