package com.labapp.repository;

import com.labapp.entity.Laborant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LaborantRepository extends JpaRepository<Laborant, Integer> {

    @Query("SELECT lab FROM Laborant lab WHERE lab.hospitalIdNo = ?1")
    Laborant findLaborantByHospitalIdNo(String hospitalIdNo);
}
