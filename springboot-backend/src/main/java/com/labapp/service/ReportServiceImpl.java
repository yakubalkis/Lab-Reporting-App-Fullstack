package com.labapp.service;

import com.labapp.entity.Report;
import com.labapp.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReportServiceImpl implements ReportService{

    private ReportRepository reportRepository;

    @Autowired
    public ReportServiceImpl(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    @Override
    public List<Report> findAll() {
        return reportRepository.findAll();
    }

    @Override
    public Report findById(Integer id) {

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
    public void deleteById(Integer id) {
        reportRepository.deleteById(id);
    }
}
