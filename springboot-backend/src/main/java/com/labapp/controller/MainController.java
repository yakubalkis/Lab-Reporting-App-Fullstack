package com.labapp.controller;

import com.labapp.entity.Laborant;
import com.labapp.entity.Report;
import com.labapp.service.LaborantService;
import com.labapp.service.ReportService;
import org.apache.commons.io.IOUtils;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @PutMapping("/reports")
    public Report updateReport(@RequestBody Report updatedReport)
    {
        return reportService.save(updatedReport);
    }

    @DeleteMapping("/reports/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteReport(@PathVariable Integer id){

        reportService.deleteById(id);
        Map<String, Boolean> response = new HashMap<>();

        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/laborant")
    public Laborant createLaborant(@RequestBody Laborant laborant){
        return laborantService.save(laborant);
    }

    @PostMapping(value = "/file", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity uploadFile(@RequestParam MultipartFile img) throws IOException {


            File saveFile = new ClassPathResource("static/img").getFile();
            Path path = Paths.get(saveFile.getAbsolutePath() + File.separator + img.getOriginalFilename());

            Files.copy(img.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

        return ResponseEntity.ok().build();
    }

    @PutMapping(value = "/file", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity updateFile(@RequestParam MultipartFile img, @RequestParam String oldImageName) throws IOException {

        // first, delete old image
        File saveFile = new ClassPathResource("static/img").getFile();
        Path path = Paths.get(saveFile.getAbsolutePath() + File.separator + oldImageName);
        Files.delete(path);

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
