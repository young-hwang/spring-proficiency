package me.springdataredishyperloglog.contorller;

import lombok.RequiredArgsConstructor;
import me.springdataredishyperloglog.dto.UserDto;
import me.springdataredishyperloglog.service.UserHyperLogLogService;
import me.springdataredishyperloglog.service.UserSetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class AccessController {

    private final UserHyperLogLogService hyperLogLogService;

    @PostMapping("/access")
    public ResponseEntity<String> postUser(@RequestBody UserDto user) {
        hyperLogLogService.logUser(user);
        return ResponseEntity.ok("ok");
    }

    @PostMapping("/hyperloglog/hourly")
    public ResponseEntity<String> hourlyCardinality(@RequestParam long timestamp) {
        long cardinality = hyperLogLogService.getCardinality(hyperLogLogService.getHourlyKey(timestamp));
        return ResponseEntity
                .ok("cardinality: " + cardinality + ", timestamp: " + timestamp);
    }

    @PostMapping("/hyperloglog/daily")
    public ResponseEntity<String> dailyCardinality(@RequestParam long timestamp) {
        long cardinality = hyperLogLogService.getCardinality(hyperLogLogService.getDailyKey(timestamp));
        return ResponseEntity
                .ok("cardinality: " + cardinality + ", timestamp: " + timestamp);
    }

}
