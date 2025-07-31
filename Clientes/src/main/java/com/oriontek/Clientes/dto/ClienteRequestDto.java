package com.oriontek.Clientes.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClienteRequestDto {
    private String nombre;
    private String email;
    private String telefono;
}