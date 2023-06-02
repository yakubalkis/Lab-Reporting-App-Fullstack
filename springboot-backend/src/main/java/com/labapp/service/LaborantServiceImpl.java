package com.labapp.service;

import com.labapp.dto.LaborantDTO;
import com.labapp.entity.Laborant;
import com.labapp.repository.LaborantRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LaborantServiceImpl implements LaborantService{

    private LaborantRepository laborantRepository;
    private ModelMapper modelMapper;

    @Autowired
    public LaborantServiceImpl(LaborantRepository laborantRepository, ModelMapper modelMapper) {
        this.laborantRepository = laborantRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<LaborantDTO> findAll() {
        return laborantRepository.findAll()
                .stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public Laborant findById(Long id) {

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
    public void deleteById(Long id) {
        laborantRepository.deleteById(id);
    }

    @Override
    public Laborant findLaborantByHospitalIdNo(String hospitalIdNo) {
        return laborantRepository.findLaborantByHospitalIdNo(hospitalIdNo);
    }

    private LaborantDTO convertEntityToDto(Laborant laborant){
        LaborantDTO laborantDTO = new LaborantDTO();
        laborantDTO = modelMapper.map(laborant, LaborantDTO.class);
        return laborantDTO;
    }

}
