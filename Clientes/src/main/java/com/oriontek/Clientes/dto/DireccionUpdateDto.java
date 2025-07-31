package com.oriontek.Clientes.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DireccionUpdateDto {
    private String calle;
    private String ciudad;
    private String pais;
}