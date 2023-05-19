package com.labapp.service;

import com.labapp.entity.Report;

import java.util.List;

public interface ReportService {

    List<Report> findAll();

    Report findById(Long id);

    Report save(Report report);

    void deleteById(Long id);

}
