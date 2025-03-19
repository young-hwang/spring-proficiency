package me.springdataredis;

import lombok.Builder;
import lombok.NonNull;

@Builder
public class Book {
    @NonNull private final String id;
    @NonNull private final String title;
    @NonNull private final String author;
}
