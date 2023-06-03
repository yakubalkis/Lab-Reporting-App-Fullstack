package com.labapp.controller;

import com.labapp.dto.ReportDTO;
import com.labapp.entity.Laborant;
import com.labapp.entity.Report;
import com.labapp.service.LaborantService;
import com.labapp.service.ReportService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class MainController {

    private LaborantService laborantService;
    private ReportService reportService;
    private ModelMapper modelMapper;

    @Autowired
    public MainController(LaborantService laborantService, ReportService reportService, ModelMapper modelMapper) {
        this.laborantService = laborantService;
        this.reportService = reportService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/reports")
    public List<ReportDTO> getAllReports(){

        return reportService.findAll();
    }

    @GetMapping("/reports/{id}")
    public ReportDTO getReport(@PathVariable Long id){

        ReportDTO reportDTO = modelMapper.map(reportService.findById(id), ReportDTO.class);

        if(reportDTO == null){
            throw new RuntimeException("Report not found with id: "+ id);
        }
        return reportDTO;
    }


    @PostMapping("/reports/{laborantHospitalIdNo}")
    public ReportDTO createReport(@PathVariable String laborantHospitalIdNo, @RequestBody Report report){

        Laborant currentLaborant = laborantService.findLaborantByHospitalIdNo(laborantHospitalIdNo);

        currentLaborant.addReport(report);
        reportService.save(report);
        ReportDTO reportDTO = modelMapper.map(report, ReportDTO.class);
        return  reportDTO;
    }

    @PutMapping("/reports")
    public ReportDTO updateReport(@RequestBody Report updatedReport)
    {
        reportService.save(updatedReport);
        ReportDTO reportDTO = modelMapper.map(updatedReport, ReportDTO.class);
        return  reportDTO;
    }

    @DeleteMapping("/reports/{id}")
    public ResponseEntity<String> deleteReport(@PathVariable Long id){

        Report report = reportService.findById(id);
        Laborant laborant =  report.getLaborant();

        laborant.getReports().remove(report);
        reportService.deleteById(id);

        return ResponseEntity.ok("Deleted successfully");
    }

    @PostMapping(value = "/file", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity uploadFile(@RequestParam MultipartFile img) throws IOException {

        File saveFile = new ClassPathResource("static/img").getFile();
        Path path = Paths.get(saveFile.getAbsolutePath() + File.separator + img.getOriginalFilename());

        Files.copy(img.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

        return ResponseEntity.ok().build();
    }


    @PutMapping(value = "/file", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity updateFile(@RequestParam MultipartFile img) throws IOException {

        File saveFile = new ClassPathResource("static/img").getFile();

        // save new image
        Path path2 = Paths.get(saveFile.getAbsolutePath() + File.separator + img.getOriginalFilename());
        Files.copy(img.getInputStream(), path2, StandardCopyOption.REPLACE_EXISTING);

        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/file/{imgName}", produces = MediaType.MULTIPART_FORM_DATA_VALUE)
    public @ResponseBody byte[] getImage(@PathVariable String imgName) throws IOException {

        File saveFile = new ClassPathResource("static/img").getFile();
        Path path = Paths.get(saveFile.getAbsolutePath() + File.separator + imgName);


        InputStream in = Files.newInputStream(path, StandardOpenOption.READ);
        return in.readAllBytes();
    }

}
