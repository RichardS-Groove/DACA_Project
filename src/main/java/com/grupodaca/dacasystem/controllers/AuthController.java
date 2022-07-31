package com.grupodaca.dacasystem.controllers;

import com.grupodaca.dacasystem.dto.SuccessDTO;
import com.grupodaca.dacasystem.dto.request.UserRequestDTO;
import com.grupodaca.dacasystem.entity.UserEntity;
import com.grupodaca.dacasystem.repository.UserRepository;
import com.grupodaca.dacasystem.service.UserService;
import com.grupodaca.dacasystem.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AuthController {
    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private JWTUtil jwtUtil;

    @PostMapping(value = "/login")
    public String login(@RequestBody UserRequestDTO dto){
        UserEntity userSession = userService.userVerify(dto);

        if(userSession!=null){
            UserEntity myActiveUser = userRepository.userSession(dto.getUsername());
            return jwtUtil.create(String.valueOf(myActiveUser.getId()), myActiveUser.getEmail());
        } else {
            return "FAIL";
        }
    }
}
