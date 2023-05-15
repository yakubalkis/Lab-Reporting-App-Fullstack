package com.labapp.controller;

import com.labapp.entity.Report;
import com.labapp.repository.LaborantRepository;
import com.labapp.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class MainController {

    private LaborantRepository laborantRepository;
    private ReportRepository reportRepository;

    @Autowired
    public MainController(LaborantRepository laborantRepository, ReportRepository reportRepository) {
        this.laborantRepository = laborantRepository;
        this.reportRepository = reportRepository;
    }

    @GetMapping("/reports")
    public List<Report> getAllReports(){
        return reportRepository.findAll();
    }

    





}
