package com.labapp.service;

import com.labapp.dto.LaborantDTO;
import com.labapp.entity.Laborant;


import java.util.List;

public interface LaborantService{

    List<LaborantDTO> findAll();

    Laborant findById(Long id);

    Laborant save(Laborant theLaborant);

    void deleteById(Long id);

    Laborant findLaborantByHospitalIdNo(String hospitalIdNo);

    List<Laborant> getLaborantListByNameOrSurname(String firstName, String lastName);

}
