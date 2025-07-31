package com.oriontek.Clientes.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oriontek.Clientes.models.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    
}
