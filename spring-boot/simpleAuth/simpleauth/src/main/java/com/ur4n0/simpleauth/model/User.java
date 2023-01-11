package com.ur4n0.simpleauth.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name ="User")
@Data
public class User {
    @Column(name ="idCoordinator", updatable = false)
    private Long id;

    @Column(name ="name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;
}
