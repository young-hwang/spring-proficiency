package me.userservice.service;

import lombok.RequiredArgsConstructor;
import me.userservice.dto.UserDto;
import me.userservice.jpa.UserEntity;
import me.userservice.jpa.UserRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;

import java.util.UUID;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public UserDto createUser(UserDto userDto) {
        userDto.setUserId(UUID.randomUUID().toString());
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        UserEntity entity = mapper.map(userDto, UserEntity.class);
        entity.setEncryptedPwd("encrypted_password");
        userRepository.save(entity);
        return mapper.map(entity, UserDto.class);
    }
}
