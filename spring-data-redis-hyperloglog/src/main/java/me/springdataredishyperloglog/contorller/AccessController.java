package me.springdataredishyperloglog.contorller;

import lombok.RequiredArgsConstructor;
import me.springdataredishyperloglog.service.AccessLogService;
import me.springdataredishyperloglog.vo.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class AccessController {

    private final AccessLogService accessLogService;

    @PostMapping("/access")
    public ResponseEntity<String> postUser(@RequestBody User user) {
        accessLogService.log(user);
        return ResponseEntity.ok("ok");
    }
}
