package me.springdataredishyperloglog.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class UserDto {
    private final String userId;
    private final Long timestamp;
}
