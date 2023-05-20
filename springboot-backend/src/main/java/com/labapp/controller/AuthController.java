package com.labapp.controller;

import com.labapp.entity.Laborant;
import com.labapp.requests.LaborantRequest;
import com.labapp.response.AuthResponse;
import com.labapp.security.JwtTokenProvider;
import com.labapp.service.LaborantService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private AuthenticationManager authenticationManager;
    private JwtTokenProvider tokenProvider;

    private LaborantService laborantService;

    private PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationManager authenticationManager, JwtTokenProvider tokenProvider, LaborantService laborantService, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.laborantService = laborantService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LaborantRequest loginRequest){
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(loginRequest.getHospitalIdNo(),loginRequest.getPassword());

        Authentication auth = authenticationManager.authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(auth);
        String jwtToken = tokenProvider.generateJwtToken(auth);

        Laborant laborant = laborantService.findLaborantByHospitalIdNo(loginRequest.getHospitalIdNo());

        AuthResponse authResponse = new AuthResponse();
        authResponse.setMessage("Bearer " + jwtToken);
        authResponse.setHospitalIdNo(laborant.getHospitalIdNo());

        return authResponse;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody Laborant laborant){
        AuthResponse authResponse = new AuthResponse();

        if(laborantService.findLaborantByHospitalIdNo(laborant.getHospitalIdNo()) != null){
            authResponse.setMessage("Hospital ID No already in use.");
            return new ResponseEntity<>(authResponse, HttpStatus.BAD_REQUEST);
        }

        laborant.setPassword(passwordEncoder.encode(laborant.getPassword()));
        laborantService.save(laborant);
        authResponse.setMessage("Successfully registered. You can login.");
        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

}
