package me.userservice.exception;

import java.util.HashMap;
import java.util.Map;

public class BusinessException extends RuntimeException {
    // 클라이언트 개발자가 예외 상황을 식별할 수 있는 값
    private final String code;

    // 클라이언트 개발자가 예외 상황을 이해하는데 도움이 되는 정보
    private final Map<String, Object> arguments;

    public BusinessException(String code) {
        this(code, null);
    }

    public BusinessException(String code, String message) {
        super(message);
        this.code = code;
        this.arguments = new HashMap<>();
    }

    protected void addArguments(String key, Object value) {
        arguments.put(key, value);
    }
}

