package com.labapp.service;

import com.labapp.entity.Laborant;

import java.util.List;

public interface LaborantService {

    List<Laborant> findAll();

    Laborant findById(Integer id);

    Laborant save(Laborant theLaborant);

    void deleteById(Integer id);

}
