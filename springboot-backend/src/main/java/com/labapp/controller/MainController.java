package com.labapp.controller;

import com.labapp.entity.Laborant;
import com.labapp.entity.Report;
import com.labapp.repository.LaborantRepository;
import com.labapp.repository.ReportRepository;
import com.labapp.service.LaborantService;
import com.labapp.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class MainController {

    private LaborantService laborantService;
    private ReportService reportService;

    @Autowired
    public MainController(LaborantService laborantService, ReportService reportService) {
        this.laborantService = laborantService;
        this.reportService = reportService;
    }

    @GetMapping("/reports")
    public List<Report> getAllReports(){
        return reportService.findAll();
    }

    @GetMapping("/reports/{id}")
    public Report getReport(@PathVariable Integer id){

        Report report = reportService.findById(id);

        if(report == null){
            throw new RuntimeException("Report not found with id: "+ id);
        }
        return report;
    }


    @PostMapping("/reports/{laborantHospitalIdNo}")
    public Report createReport(@PathVariable String laborantHospitalIdNo, @RequestBody Report report){

        Laborant currentLaborant = laborantService.findLaborantByHospitalIdNo(laborantHospitalIdNo);
        currentLaborant.addReport(report);

        return reportService.save(report);
    }



}
