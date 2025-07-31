package com.oriontek.Clientes.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClienteResponseDto {
    private Long id;
    private String nombre;
    private String email;
    private String telefono;
}
