package me.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Slf4j
@Tag(name = "Home", description = "Home page")
@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "home";
    }
}
