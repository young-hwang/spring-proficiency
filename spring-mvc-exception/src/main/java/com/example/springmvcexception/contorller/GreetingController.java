package com.example.springmvcexception.contorller;

import com.example.springmvcexception.exception.MyException1;
import com.example.springmvcexception.exception.MyException2;
import com.example.springmvcexception.exception.MyResourceNotFoundException;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@Slf4j
@RestController
public class GreetingController {

    @GetMapping("/hello")
    public String helloWorld() {
        return "hello";
    }

    @GetMapping("/exception1")
    public String exception1() {
        throw new MyException1();
    }

    @GetMapping("/exception2")
    public String exception2() {
        throw new MyException2();
    }

    @GetMapping("/runtime")
    public String runtimeException() {
        throw new RuntimeException();
    }

    @GetMapping("/notFound")
    public String notFound() {
        throw new MyResourceNotFoundException("Not Found");
    }

//    @GetMapping(value = "/{id}")
//    public Foo findById(@PathVariable("id") Long id, HttpServletResponse response) {
//        try {
//            Foo resourceById = RestPreconditions.checkFound(service.findOne(id));
//
//            eventPublisher.publishEvent(new SingleResourceRetrievedEvent(this, response));
//            return resourceById;
//        } catch (MyResourceNotFoundException exc) {
//            throw new ResponseStatusException(
//                    HttpStatus.NOT_FOUND, "Foo Not Found", exc);
//        }
//    }

    @ExceptionHandler({MyException1.class, MyException2.class}) // 여러 클래스를 배열로 선언 가능
    public void handleException(Exception e) {
        System.out.println("handleException");
        e.printStackTrace();
    }

}
