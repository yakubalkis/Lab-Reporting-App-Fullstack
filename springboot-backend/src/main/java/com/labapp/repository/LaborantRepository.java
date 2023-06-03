package com.labapp.repository;

import com.labapp.entity.Laborant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LaborantRepository extends JpaRepository<Laborant, Long> {

    @Query("SELECT lab FROM Laborant lab WHERE lab.hospitalIdNo = ?1")
    Laborant findLaborantByHospitalIdNo(String hospitalIdNo);

    @Query("SELECT l FROM Laborant l WHERE l.firstName LIKE ?1% OR l.lastName LIKE ?2%")
    List<Laborant> getLaborantByNameORSurname(String firstName, String lastName);

}
