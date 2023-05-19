package com.labapp.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "report")
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "tc_no")
    private String tcNo;
    @Column(name = "diagnosis_title")
    private String diagnosisTitle;
    @Column(name = "diagnosis_detail")
    private String diagnosisDetail;
    @Column(name = "date")
    private String date;

    @Column(name = "image_name")
    private String imageName;

    @Column(name = "created_by")
    private String createdBy;

    public Report() {
    }

    public Report(String firstName, String lastName, String tcNo, String diagnosisTitle, String diagnosisDetail, String date, String imageName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.tcNo = tcNo;
        this.diagnosisTitle = diagnosisTitle;
        this.diagnosisDetail = diagnosisDetail;
        this.date = date;
        this.imageName = imageName;
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

    public String getTcNo() {
        return tcNo;
    }

    public void setTcNo(String tcNo) {
        this.tcNo = tcNo;
    }

    public String getDiagnosisTitle() {
        return diagnosisTitle;
    }

    public void setDiagnosisTitle(String diagnosisTitle) {
        this.diagnosisTitle = diagnosisTitle;
    }

    public String getDiagnosisDetail() {
        return diagnosisDetail;
    }

    public void setDiagnosisDetail(String diagnosisDetail) {
        this.diagnosisDetail = diagnosisDetail;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    @Override
    public String toString() {
        return "Report{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", tcNo='" + tcNo + '\'' +
                ", diagnosisTitle='" + diagnosisTitle + '\'' +
                ", diagnosisDetail='" + diagnosisDetail + '\'' +
                ", date='" + date + '\'' +
                ", imageName='" + imageName + '\'' +
                '}';
    }
}
