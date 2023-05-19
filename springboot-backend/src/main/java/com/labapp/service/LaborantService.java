package com.labapp.service;

import com.labapp.entity.Laborant;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface LaborantService{

    List<Laborant> findAll();

    Laborant findById(Long id);

    Laborant save(Laborant theLaborant);

    void deleteById(Long id);

    Laborant findLaborantByHospitalIdNo(String hospitalIdNo);


}
