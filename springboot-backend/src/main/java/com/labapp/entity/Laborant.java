package com.labapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name="laborant")
public class Laborant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "hospital_id_no")
    private String hospitalIdNo;

    @Column(name = "password")
    private String password;

    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "role_id")
    private Role role;

    @JsonIgnore
    @OneToMany(mappedBy="laborant", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Report> reports;


    // add a convenience method for bidirectional relationship between Report and Laborant
    public void addReport(Report report){
        if(reports == null){
            reports = new ArrayList<>();
        }
        reports.add(report);
        report.setLaborant(this);
    }

    public Laborant() {
    }

    public Laborant(String firstName, String lastName, String hospitalIdNo, String password, Role role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.hospitalIdNo = hospitalIdNo;
        this.password = password;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
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
                ", password='" + password + '\'' +
                ", role=" + role +
                ", reports=" + reports +
                '}';
    }
}
