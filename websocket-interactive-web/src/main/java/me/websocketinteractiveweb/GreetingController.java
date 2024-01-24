package me.websocketinteractiveweb;

import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
public class GreetingController {

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting(HelloMessage message) throws InterruptedException {
        Thread.sleep(1000);
        return new Greeting("Hello, " + message.getName() + "!");
    }

    @MessageMapping("/log")
    public void log(HelloMessage message) {
        log.info("Received message: {}", message.getName());
    }
}
