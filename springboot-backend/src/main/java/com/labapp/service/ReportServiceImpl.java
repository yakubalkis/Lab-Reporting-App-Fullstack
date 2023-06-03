package com.labapp.service;

import com.labapp.dto.LaborantDTO;
import com.labapp.dto.ReportDTO;
import com.labapp.entity.Laborant;
import com.labapp.entity.Report;
import com.labapp.repository.ReportRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReportServiceImpl implements ReportService{

    private ReportRepository reportRepository;

    private ModelMapper modelMapper;

    @Autowired
    public ReportServiceImpl(ReportRepository reportRepository, ModelMapper modelMapper)
    {
        this.reportRepository = reportRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<ReportDTO> findAll() {
        return reportRepository.findAll()
                .stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public Report findById(Long id) {

        Optional<Report> result = reportRepository.findById(id);
        Report report = null;

        if(result.isPresent()){
            report = result.get();
        }
        else{
            throw new RuntimeException("Did not found report with id: "+ id);
        }

        return report;
    }

    @Override
    public Report save(Report report) {
        return reportRepository.save(report);
    }

    @Override
    public void deleteById(Long id) {
        reportRepository.deleteById(id);
    }

    @Override
    public List<ReportDTO> getListByPatientNameORSurname(String firstName, String lastName) {
        return reportRepository.getByPatientNameORSurname(firstName, lastName)
                .stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ReportDTO> getListByTcNo(String tcNo) {
        return reportRepository.getByTcNo(tcNo)
                .stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    private ReportDTO convertEntityToDto(Report report){
        ReportDTO reportDTO = new ReportDTO();
        reportDTO = modelMapper.map(report, ReportDTO.class);
        return reportDTO;
    }
}
