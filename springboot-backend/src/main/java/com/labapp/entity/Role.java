package com.labapp.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "role")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="id")
    private Long id;

    @Column(name ="role_name")
    private String roleName;

    @OneToOne(mappedBy = "role", cascade = {CascadeType.DETACH,CascadeType.MERGE, CascadeType.PERSIST,CascadeType.REFRESH})
    private Laborant laborant;

    public Role() {
    }

    public Role(String roleName) {
        this.roleName = roleName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public Laborant getLaborant() {
        return laborant;
    }

    public void setLaborant(Laborant laborant) {
        this.laborant = laborant;
    }
    
}
