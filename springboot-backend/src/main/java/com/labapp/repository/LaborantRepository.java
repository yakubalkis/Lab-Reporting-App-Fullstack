package com.labapp.repository;

import com.labapp.entity.Laborant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LaborantRepository extends JpaRepository<Laborant, Integer> {

}
