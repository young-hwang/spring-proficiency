package me.userservice.exception;

public class InvalidExpressionException extends BusinessException{
    public InvalidExpressionException(int position, String hint) {
        super("expression.Invalid", "표현식이 올바르지 않습니다.");
        addArguments("position", position);
        addArguments("hint", hint);
    }
}
