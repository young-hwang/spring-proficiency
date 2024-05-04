package me.springcorsbloomfilter;

import org.openjdk.jol.info.GraphLayout;

import java.time.Duration;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
         Set<String> setFilter = new HashSet<>(5_000_000, 0.9f);

        for (int i = 0; i < 10_000_000; i++) {
            String url = "http://www." + i + ".com";
            setFilter.add(url);
        }

        String setLayout = GraphLayout.parseInstance(setFilter).totalSize() + " bytes";
        System.out.println("Set size: " + setLayout); // 10648592bytes = 10.6mb
        // 1027116632 bytes = 1.03gb

        Instant startSet = Instant.now();
        int rows = setFilter.size();
        Instant endSet = Instant.now();
        System.out.println("Set size: " + Duration.between(startSet, endSet).toMillis() + " / " + rows + " ms");
    }
}
