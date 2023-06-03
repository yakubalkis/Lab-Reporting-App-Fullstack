package com.labapp.controller;

import com.labapp.dto.ReportDTO;
import com.labapp.entity.Laborant;
import com.labapp.entity.Report;
import com.labapp.service.LaborantService;
import com.labapp.service.ReportService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/search/reports")
public class SearchController {

    private LaborantService laborantService;
    private ReportService reportService;
    private ModelMapper modelMapper;

    @Autowired
    public SearchController(LaborantService laborantService, ReportService reportService, ModelMapper modelMapper) {
        this.laborantService = laborantService;
        this.reportService = reportService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/f1/{patientFullName}")
    public List<ReportDTO> searchByPatientNameOrSurname(@PathVariable String patientFullName){
        String[] fullName = patientFullName.split(" ");

        if(fullName.length == 2){ // there is both name and surname
            return reportService.getListByPatientNameORSurname(fullName[0], fullName[1]);
        }
        else{
            return reportService.getListByPatientNameORSurname(fullName[0], fullName[0]); // if there's no second word, user may have entered the name or surname.
        }
    }

    @GetMapping("/f2/{tcNo}")
    public List<ReportDTO> searchByTcNo(@PathVariable String tcNo){

        return reportService.getListByTcNo(tcNo);
    }

    @GetMapping("/f3/{laborantFullName}")
    public List<ReportDTO> searchByLaborantNameOrSurname(@PathVariable String laborantFullName){

        String[] fullName = laborantFullName.split(" ");

        List<Laborant> laborants = new ArrayList<>();
        List<ReportDTO> allReports = new ArrayList<>();

        if(fullName.length == 2){ // there is both name and surname
            laborants =  laborantService.getLaborantListByNameOrSurname(fullName[0], fullName[1]);
        }
        else{
            laborants = laborantService.getLaborantListByNameOrSurname(fullName[0], fullName[0]); // if there's no second word, user may have entered the name or surname.
        }

        for (Laborant laborant : laborants) { // convert reports to reportDtos
            allReports.addAll(laborant.getReports()
                                        .stream()
                                        .map(this::convertEntityToDto)
                                        .collect(Collectors.toList()));

        }
        return allReports;
    }

    private ReportDTO convertEntityToDto(Report report){ // custom method for dto conversion
        ReportDTO reportDTO = new ReportDTO();
        reportDTO = modelMapper.map(report, ReportDTO.class);
        return reportDTO;
    }

}
