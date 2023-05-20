package com.labapp.service;

import com.labapp.entity.Laborant;
import com.labapp.repository.LaborantRepository;
import com.labapp.security.JwtUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class LaborantDetailsServiceImpl implements UserDetailsService {

    private LaborantRepository laborantRepository;

    public LaborantDetailsServiceImpl(LaborantRepository laborantRepository) {
        this.laborantRepository = laborantRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Laborant laborant = laborantRepository.findLaborantByHospitalIdNo(username);
        return JwtUserDetails.create(laborant);
    }

    public UserDetails loadUserById(Long id){
        Laborant laborant = laborantRepository.findById(id).get();
        return JwtUserDetails.create(laborant);
    }

}
