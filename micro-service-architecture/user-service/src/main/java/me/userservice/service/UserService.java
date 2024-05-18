package me.userservice.service;

import me.userservice.dto.UserDto;

public interface UserService {
    UserDto createUser(UserDto userDto);
}
