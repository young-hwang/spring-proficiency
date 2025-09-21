package me.service;

import java.util.Map;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.ChatOptions;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.chat.prompt.SystemPromptTemplate;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;

@Service
@Slf4j
public class AiServicePromptTemplate {
    // ##### 필드 #####
    private ChatClient chatClient;

    private PromptTemplate systemTemplate = SystemPromptTemplate.builder()
            .template("""
                    답변을 생성할 때 HTML와 CSS를 사용해서 파란 글자로 출력하세요.
                    <span> 태그 안에 들어갈 내용만 출력하세요.
                    """)
            .build();

    private PromptTemplate userTemplate = PromptTemplate.builder()
            .template("다음 한국어 문장을 {language}로 번역해주세요.\n 문장: {statement}")
            .build();

    // ##### 생성자 #####
    public AiServicePromptTemplate(ChatClient.Builder chatClientBuilder) {
        chatClient = chatClientBuilder.build();
    }

    // ##### 메소드 #####
    public Flux<String> promptTemplate1(String statement, String language) {
        Prompt prompt = userTemplate.create(
                Map.of("statement", statement, "language", language));

        // 대화 옵션 설정
        ChatOptions chatOptions = ChatOptions.builder()
                .model("gemini-2.0-flash")
                .temperature(0.3)
                .maxTokens(1000)
                .build();

        Flux<String> response = chatClient.prompt(prompt)
                .options(chatOptions)
                .stream()
                .content();
        return response;
    }

    public Flux<String> promptTemplate2(String statement, String language) {
        // 대화 옵션 설정
        ChatOptions chatOptions = ChatOptions.builder()
                .model("gemini-2.0-flash")
                .temperature(0.3)
                .maxTokens(1000)
                .build();

        Flux<String> response = chatClient.prompt()
                .messages(
                        systemTemplate.createMessage(),
                        userTemplate.createMessage(Map.of("statement", statement, "language", language)))
                .options(chatOptions)
                .stream()
                .content();
        return response;
    }

    public Flux<String> promptTemplate3(String statement, String language) {
        // 대화 옵션 설정
        ChatOptions chatOptions = ChatOptions.builder()
                .model("gemini-2.0-flash")
                .temperature(0.3)
                .maxTokens(1000)
                .build();

        Flux<String> response = chatClient.prompt()
                .system(systemTemplate.render())
                .user(userTemplate.render(Map.of("statement", statement, "language", language)))
                .options(chatOptions)
                .stream()
                .content();
        return response;
    }

    public Flux<String> promptTemplate4(String statement, String language) {
        String systemText = """
                답변을 생성할 때 HTML와 CSS를 사용해서 파란 글자로 출력하세요.
                <span> 태그 안에 들어갈 내용만 출력하세요.
                """;
        String userText = """
                다음 한국어 문장을 %s로 번역해주세요.\n 문장: %s
                """.formatted(language, statement);

        // 대화 옵션 설정
        ChatOptions chatOptions = ChatOptions.builder()
                .model("gemini-2.0-flash")
                .temperature(0.3)
                .maxTokens(1000)
                .build();

        Flux<String> response = chatClient.prompt()
                .system(systemText)
                .user(userText)
                .options(chatOptions)
                .stream()
                .content();
        return response;
    }
}
