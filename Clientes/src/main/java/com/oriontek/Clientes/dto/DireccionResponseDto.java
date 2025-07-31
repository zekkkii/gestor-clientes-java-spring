package com.oriontek.Clientes.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DireccionResponseDto {
    private Long id;
    private String calle;
    private String ciudad;
    private String pais;
    private Long clienteId;
}