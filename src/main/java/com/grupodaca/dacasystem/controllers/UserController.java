package com.grupodaca.dacasystem.controllers;

import com.grupodaca.dacasystem.config.JwtUtils;
import com.grupodaca.dacasystem.dto.SuccessDTO;
import com.grupodaca.dacasystem.dto.request.CustomerRequestDTO;
import com.grupodaca.dacasystem.dto.request.InvoiceRequestDTO;
import com.grupodaca.dacasystem.dto.request.UserRequestDTO;
import com.grupodaca.dacasystem.dto.response.ProjectResponseDTO;
import com.grupodaca.dacasystem.dto.response.TokenResponseDTO;
import com.grupodaca.dacasystem.dto.response.UserResponseDTO;
import com.grupodaca.dacasystem.entity.UserEntity;
import com.grupodaca.dacasystem.service.UserDetailsServiceImpl;
import com.grupodaca.dacasystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    UserDetailsServiceImpl userDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtTokenUtil;
    @Autowired
    UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @GetMapping("/users")
    public ResponseEntity<List<UserResponseDTO>> findAllProjects(){
        List<UserResponseDTO> userResponseDTO = userService.userList();
        return ResponseEntity.ok().body(userResponseDTO);
    }
    @PostMapping(value = "/user")
    public ResponseEntity<SuccessDTO> addUser(@RequestBody UserRequestDTO dto){
        if(userService.addUser(dto)!=null){
            return ResponseEntity.ok().body(new SuccessDTO("Usuario agregado con éxito", 201));
        } else{
            throw new RuntimeException();
        }
    }
    @DeleteMapping("/users/{id}")
    public ResponseEntity<SuccessDTO> deleteUser(@PathVariable Integer id){
        userService.deleteUser(id);
        return ResponseEntity.ok().body(new SuccessDTO("Usuario eliminado con éxito", 201));
    }
    @PutMapping("/users/{id}")
    public ResponseEntity<SuccessDTO> updateInvoice(@RequestBody UserRequestDTO dto, @PathVariable Integer id){
        userService.updateUser(id,dto);
        return ResponseEntity.ok().body(new SuccessDTO("Usuario modificado con éxito", 201));
    }

    @PostMapping(value = "/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody UserRequestDTO authenticationRequest)
            throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getUsername(), authenticationRequest.getPassword()));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
        UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        String token = jwtTokenUtil.generateToken(userDetails);

        UserResponseDTO userResponseDTO = new UserResponseDTO();

        UserEntity myUser = userService.userVerify(authenticationRequest);

        userResponseDTO.setName(myUser.getName());
        userResponseDTO.setLastname(myUser.getLastname());
        userResponseDTO.setEmail(myUser.getEmail());
        userResponseDTO.setToken(token);
        if(myUser!=null){
            return ResponseEntity.ok(userResponseDTO);
        } else {
            return ResponseEntity.ok("FAIL");
        }

    }
}
