package com.example.springmvcexception.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Slf4j
@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

	@ExceptionHandler(value = { IllegalArgumentException.class, IllegalStateException.class })
	protected ResponseEntity<Object> handleConflict(final RuntimeException exception, final WebRequest request) {
		// This should be application/exception/method specific
		final String responseBody = buildExceptionMsg(exception, request);
		log.error(responseBody);
		return handleExceptionInternal(exception, responseBody, new HttpHeaders(), HttpStatus.NOT_ACCEPTABLE, request);
	}

	protected String buildExceptionMsg(final RuntimeException exception, final WebRequest request) {

		final StringBuilder strBuilder = new StringBuilder();
		strBuilder.append("Exception occurred: " + exception.getClass());
		strBuilder.append("\n");
		strBuilder.append("Exception msg: " + exception.getMessage());
		strBuilder.append("\n");
		strBuilder.append("Request description: " + request.getDescription(false));

		return strBuilder.toString();
	}

}
