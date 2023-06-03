package com.labapp.repository;

import com.labapp.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {

    @Query("SELECT r FROM Report r WHERE r.firstName LIKE ?1% OR r.lastName LIKE ?2%")
    List<Report> getByPatientNameORSurname(String firstName, String lastName);

    @Query("SELECT r FROM Report r WHERE r.tcNo LIKE ?1%")
    List<Report> getByTcNo(String tcNo);

}
