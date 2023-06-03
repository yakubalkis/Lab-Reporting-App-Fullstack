package com.labapp.service;

import com.labapp.dto.ReportDTO;
import com.labapp.entity.Report;

import java.util.List;

public interface ReportService {

    List<ReportDTO> findAll();

    Report findById(Long id);

    Report save(Report report);

    void deleteById(Long id);

    List<ReportDTO> getListByPatientNameORSurname(String firstName, String lastName);

    List<ReportDTO> getListByTcNo(String tcNo);

}
