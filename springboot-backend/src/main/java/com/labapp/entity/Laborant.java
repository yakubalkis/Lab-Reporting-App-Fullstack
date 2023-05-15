package com.labapp.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="laborant")
public class Laborant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "hospital_id_no")
    private String hospitalIdNo;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "laborant_id")
    private List<Report> reports;

    // add a convenience method
    public void addReport(Report report){
        if(reports == null){
            reports = new ArrayList<>();
        }
        reports.add(report);
    }

    public Laborant() {
    }

    public Laborant(String firstName, String lastName, String hospitalIdNo) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.hospitalIdNo = hospitalIdNo;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getHospitalIdNo() {
        return hospitalIdNo;
    }

    public void setHospitalIdNo(String hospitalIdNo) {
        this.hospitalIdNo = hospitalIdNo;
    }

    public List<Report> getReports() {
        return reports;
    }

    public void setReports(List<Report> reports) {
        this.reports = reports;
    }

    @Override
    public String toString() {
        return "Laborant{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", hospitalIdNo='" + hospitalIdNo + '\'' +
                '}';
    }
}
