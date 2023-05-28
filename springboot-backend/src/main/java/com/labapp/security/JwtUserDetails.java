package com.labapp.security;

import com.labapp.entity.Laborant;
import com.labapp.entity.Role;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class JwtUserDetails implements UserDetails {

    public Long id;
    private String hospitalIdNo;
    private String password;

    private String role;

    private JwtUserDetails(Long id, String hospitalIdNo, String password, String role) {
        this.id = id;
        this.hospitalIdNo = hospitalIdNo;
        this.password = password;
        this.role = role;
    }

    public static JwtUserDetails create(Laborant laborant){ // static method that gets Laborant object and returns UserDetails object

        return new JwtUserDetails(laborant.getId(), laborant.getHospitalIdNo(), laborant.getPassword(), laborant.getRole().getRoleName());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHospitalIdNo() {
        return hospitalIdNo;
    }

    public void setHospitalIdNo(String hospitalIdNo) {
        this.hospitalIdNo = hospitalIdNo;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
