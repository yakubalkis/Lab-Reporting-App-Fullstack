package com.labapp.response;

public class AuthResponse {

    String message;
    String hospitalIdNo;

    public AuthResponse() {
    }

    public AuthResponse(String message, String hospitalIdNo) {
        this.message = message;
        this.hospitalIdNo = hospitalIdNo;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getHospitalIdNo() {
        return hospitalIdNo;
    }

    public void setHospitalIdNo(String hospitalIdNo) {
        this.hospitalIdNo = hospitalIdNo;
    }
}
