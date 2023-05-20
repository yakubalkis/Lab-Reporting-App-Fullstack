package com.labapp.requests;

public class LaborantRequest {

    private String hospitalIdNo;
    private String password;

    public LaborantRequest(String hospitalIdNo, String password) {
        this.hospitalIdNo = hospitalIdNo;
        this.password = password;
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
}
