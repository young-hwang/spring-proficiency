package me.userservice.controller;

import lombok.RequiredArgsConstructor;
import me.userservice.dto.UserDto;
import me.userservice.jpa.UserEntity;
import me.userservice.jpa.UserRepository;
import me.userservice.service.UserService;
import me.userservice.vo.Greeting;
import me.userservice.vo.RequestUser;
import me.userservice.vo.ResponseUser;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user-service")
public class UserController {
    private final Environment env;
    private final Greeting greeting;
    private final UserService userService;
    private final UserRepository userRepository;

    @GetMapping("/health_check")
    public String state() {
        return "It's Working in User Service";
    }

    @GetMapping("/welcome")
    public String welcome() {
        return env.getProperty("greeting.message");
    }

    @GetMapping("/welcome_object")
    public String welcomeObject() {
        return greeting.getMessage();
    }

    @PostMapping("/users")
    public ResponseEntity<ResponseUser> createUser(@RequestBody RequestUser user) {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        UserDto userDto = mapper.map(user, UserDto.class);
        userService.createUser(userDto);
        ResponseUser responseUser = mapper.map(userDto, ResponseUser.class);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseUser);
    }

    @GetMapping("/users")
    public ResponseEntity<List<ResponseUser>> getUsers() {
        Iterable<UserEntity> userByAll = userService.getUserByAll();
        List<ResponseUser> result = new ArrayList<>();
        userByAll.forEach((user) ->
                result.add(new ModelMapper().map(user, ResponseUser.class))
        );
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<ResponseUser> getUser(@PathVariable String userId) {
        UserDto userByUserId = userService.getUserByUserId(userId);
        ResponseUser responseUser = new ModelMapper().map(userByUserId, ResponseUser.class);
        return ResponseEntity.ok().body(responseUser);
    }
}
