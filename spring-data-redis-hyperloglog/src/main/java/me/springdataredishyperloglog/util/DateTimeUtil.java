package me.springdataredishyperloglog.util;

import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

public class DateTimeUtil {
    public static String timestampToZonedDateTime(long timestamp, String format, String zone) {
        return Instant.ofEpochMilli(timestamp).atZone(ZoneId.of(zone)).format(DateTimeFormatter.ofPattern(format));
    }

    public static String timestampToZonedDateTime(long timestamp, String format) {
        return timestampToZonedDateTime(timestamp, format, "UTC");
    }

    public static String timestampToZonedDateTime(long timestamp) {
        return timestampToZonedDateTime(timestamp, "yyyy-MM-dd HH:mm", "UTC");
    }
}
