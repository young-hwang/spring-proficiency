package com.example.springmvcexception.exception;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.AbstractHandlerExceptionResolver;

import java.io.IOException;

@Component
public class RestResponseStatusExceptionResolver extends AbstractHandlerExceptionResolver {
    @Override
    protected ModelAndView doResolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        try {
			if (ex instanceof IllegalArgumentException) {
				return handleIllegalArgument((IllegalArgumentException) ex, request, response);
			}
			// ...
		} catch (final Exception handlerException) {
			logger.warn("Handling of [" + ex.getClass().getName() + "] resulted in Exception", handlerException);
		}
		return null;
    }

    private ModelAndView handleIllegalArgument(final IllegalArgumentException ex, final HttpServletRequest request, final HttpServletResponse response) throws IOException {
		response.sendError(HttpServletResponse.SC_CONFLICT);
		final String accept = request.getHeader(HttpHeaders.ACCEPT);
		// ...
		return new ModelAndView();
	}
}
