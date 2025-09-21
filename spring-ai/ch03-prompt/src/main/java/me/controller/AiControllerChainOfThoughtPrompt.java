package me.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import me.service.AiServiceChainOfThoughtPrompt;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;

@Tag(name = "Chain of Thought Prompt")
@RestController
@RequestMapping("/ai")
@Slf4j
public class AiControllerChainOfThoughtPrompt {
  // ##### 필드 ##### 
  @Autowired
  private AiServiceChainOfThoughtPrompt aiService;  

  //##### 메소드 ##### 
  @PostMapping(
    value = "/chain-of-thought",
    consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE,
    produces = MediaType.APPLICATION_NDJSON_VALUE
  )
  public Flux<String> chainOfThought(@RequestParam("question") String question) {
    Flux<String> answer = aiService.chainOfThought(question);
    return answer;
  } 
}
