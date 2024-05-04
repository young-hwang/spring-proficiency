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
    private static int expectedSize = 10_000_000;
    private static double falsePositiveProbability = 0.01;
    private static Set<String> setFilter;

    @BeforeAll
    static void setUp() {
        bloomFilter = BloomFilter.create(Funnels.stringFunnel(StandardCharsets.UTF_8), expectedSize, falsePositiveProbability);
        setFilter = new HashSet<>(5_000_000, 0.9f);

        for (int i = 0; i < expectedSize; i++) {
            if (i % 2 == 0 ) continue;
            val url = "http://www." + i + ".com";
            bloomFilter.put(url);
            setFilter.add(url);
        }
    }

    @Test
    void testSizeComparison() {
        // given
        int expectedSize = 10_000_000;
        double falsePositiveProbability = 0.01;
        bloomFilter = BloomFilter.create(Funnels.stringFunnel(StandardCharsets.UTF_8), expectedSize, falsePositiveProbability);
        setFilter = new HashSet<>(expectedSize, 0.9f);
        // when
        for (int i = 0; i < expectedSize; i++) {
            val url = "http://www." + i + ".com";
            bloomFilter.put(url);
            setFilter.add(url);
        }
        // then
        String bloomLayout = GraphLayout.parseInstance(bloomFilter).totalSize() + " bytes";
        String setLayout = GraphLayout.parseInstance(setFilter).totalSize() + " bytes";
        System.out.println("BloomFilter size: " + bloomLayout); // 11981760 bytes = 11.9mb
        System.out.println("Set size: " + setLayout); // 1027116632 bytes = 1.03gb
    }

     @Test
    void testPerformanceComparison() {
        Instant startBloom = Instant.now();
        for (int i = 0; i < expectedSize; i++) {
             val url = "http://www." + i + ".com";
            bloomFilter.mightContain(url);
        }
        Instant finishBloom = Instant.now();
        long timeElapsedBloom = Duration.between(startBloom, finishBloom).toMillis(); // in millis

        Instant startSet = Instant.now();
        for (int i = 0; i < expectedSize; i++) {
            val url = "http://www." + i + ".com";
            setFilter.contains(url);
        }
        Instant finishSet = Instant.now();
        long timeElapsedSet = Duration.between(startSet, finishSet).toMillis(); // in millis

        System.out.println("BloomFilter mightContain execution time in milliseconds: " + timeElapsedBloom);
        System.out.println("Set contains execution time in milliseconds: " + timeElapsedSet);
    }

    @Test
    void testFalsePositive() {
        // given
        int falsePositive = 0;
        int positive = 0;
        // when
        // then
        for (int i = 0; i < expectedSize ; i++) {
            val url = "http://www." + i + ".com";
            if (i % 2 == 0 ) {
                if (bloomFilter.mightContain(url)) {
                    falsePositive++;
                }
            } else {
                if (bloomFilter.mightContain(url)) {
                    positive++;
                }
            }
        }
        System.out.println("Positive: " + positive);
        System.out.println("False positive: " + falsePositive);
    }

    @AfterAll
    static void tearDown() {
        bloomFilter = null;
    }

}
