package me.springcorsbloomfilter;

import com.google.common.hash.BloomFilter;
import com.google.common.hash.Funnels;
import lombok.val;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openjdk.jol.info.GraphLayout;

import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

public class BloomFilterPerformanceTest {

    private static BloomFilter<String> bloomFilter;
    private static int expectedSize = 8_000_000;
    private static double falsePositiveProbability = 0.01;
    private static Set<String> setFilter;

    @BeforeAll
    static void setUp() {
//        bloomFilter = BloomFilter.create(Funnels.stringFunnel(StandardCharsets.UTF_8), expectedSize, falsePositiveProbability);
        setFilter = new HashSet<>();

        for (int i = 0; i < expectedSize; i++) {
            val url = "http://www." + i + ".com";
//            bloomFilter.put(url);
            setFilter.add(url);
        }
    }

    @Test
    void testSizeComparison() {
        // given
//        String bloomLayout = GraphLayout.parseInstance(bloomFilter).totalSize() + " bytes";
//        String setLayout = GraphLayout.parseInstance(setFilter).totalSize() + " bytes";
        // when
        // then
//        System.out.println("BloomFilter size: " + bloomLayout); // 120248bytes = 120kb
        // 1198568 bytes = 1.2mb 1_000_000
        // 119813664 bytes = 119.8mb 100_000_000
        System.out.println("Set size: " + setFilter.size()); // 10648592bytes = 10.6mb
        // 104389056 bytes = 104.4mb
    }

     @Test
    void testPerformanceComparison() {
//        Instant startBloom = Instant.now();
//        for (int i = 0; i < expectedSize; i++) {
//             val url = "http://www." + i + ".com";
//            bloomFilter.mightContain(url);
//        }
//        Instant finishBloom = Instant.now();
//        long timeElapsedBloom = Duration.between(startBloom, finishBloom).toMillis(); // in millis

        Instant startSet = Instant.now();
        for (int i = 0; i < expectedSize; i++) {
            val url = "http://www." + i + ".com";
            setFilter.contains(url);
        }
        Instant finishSet = Instant.now();
        long timeElapsedSet = Duration.between(startSet, finishSet).toMillis(); // in millis

//        System.out.println("BloomFilter mightContain execution time in milliseconds: " + timeElapsedBloom);
        System.out.println("Set contains execution time in milliseconds: " + timeElapsedSet);
    }

    @AfterAll
    static void tearDown() {
        bloomFilter = null;
    }

}
