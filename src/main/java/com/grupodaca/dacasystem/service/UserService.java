package com.grupodaca.dacasystem.service;

import com.grupodaca.dacasystem.dto.request.UserRequestDTO;
import com.grupodaca.dacasystem.dto.response.CustomerResponseDTO;
import com.grupodaca.dacasystem.dto.response.UserResponseDTO;
import com.grupodaca.dacasystem.entity.Customer;
import com.grupodaca.dacasystem.entity.UserEntity;
import com.grupodaca.dacasystem.repository.UserRepository;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;


    ModelMapper mapper = new ModelMapper();

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Integer addUser(UserRequestDTO userRequestDTO){
        UserEntity user = mapper.map(userRequestDTO, UserEntity.class);

        String hash = passwordEncoder.encode(user.getPassword());

        user.setPassword(hash);

        user = userRepository.save(user);

        return user.getId();
    }
    public List<UserResponseDTO> userList() {

        List<UserEntity> userEntityList = userRepository.findAll();

        List<UserResponseDTO> userResponseDTOList = new ArrayList<>();
        userResponseDTOList = userEntityList.stream().map(
                user -> mapper.map(user, UserResponseDTO.class)
        ).collect(Collectors.toList());

        return userResponseDTOList;
    }

    public void deleteUser(Integer id) {

        userRepository.deleteById(id);
    }


    public UserEntity userVerify(UserRequestDTO dto) {
        UserEntity myUser = userRepository.userSession(dto.getUsername());

        String hashedPassword = myUser.getPassword();

        boolean verify = passwordEncoder.matches(dto.getPassword(), myUser.getPassword());

        myUser.setPassword(passwordEncoder.encode(dto.getPassword()));

        if (verify){
            return myUser;
        } else{
            return null;
        }
    }
    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Bean
    public DaoAuthenticationProvider authProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(encoder());
        return authProvider;
    }
    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    public Integer updateUser(Integer id, UserRequestDTO dto) {
        Optional<UserEntity> myUpdatedUserOptional = userRepository.findById(id);

        UserEntity myUpdatedUser = myUpdatedUserOptional.get();

        //String newHashedPass = passwordEncoder.encode(dto.getPassword());

        myUpdatedUser.setName(dto.getName());
        myUpdatedUser.setLastname(dto.getLastname());
        myUpdatedUser.setEmail(dto.getEmail());
        myUpdatedUser.setUsername(dto.getUsername());
        myUpdatedUser.setPassword(dto.getPassword());
        myUpdatedUser.setRol(dto.getRol());

        userRepository.save(myUpdatedUser);

        return myUpdatedUser.getId();
    }
}
