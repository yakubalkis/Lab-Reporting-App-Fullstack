package com.labapp.service;

import com.labapp.entity.Laborant;
import com.labapp.repository.LaborantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LaborantServiceImpl implements LaborantService{

    private LaborantRepository laborantRepository;

    @Autowired
    public LaborantServiceImpl(LaborantRepository laborantRepository) {
        this.laborantRepository = laborantRepository;
    }

    @Override
    public List<Laborant> findAll() {
        return laborantRepository.findAll();
    }

    @Override
    public Laborant findById(Integer id) {

        Optional<Laborant> result = laborantRepository.findById(id);
        Laborant laborant = null;

        if(result.isPresent()){
            laborant = result.get();
        }
        else{
            throw new RuntimeException("Did not found laborant with id: "+ id);
        }

        return laborant;
    }

    @Override
    public Laborant save(Laborant theLaborant) {
        return laborantRepository.save(theLaborant);
    }

    @Override
    public void deleteById(Integer id) {
        laborantRepository.deleteById(id);
    }

    @Override
    public Laborant findLaborantByHospitalIdNo(String hospitalIdNo) {
        return laborantRepository.findLaborantByHospitalIdNo(hospitalIdNo);
    }
}
