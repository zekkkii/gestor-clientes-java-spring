package com.oriontek.Clientes.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClienteUpdateDto {
    private String nombre;
    private String email;
    private String telefono;
}