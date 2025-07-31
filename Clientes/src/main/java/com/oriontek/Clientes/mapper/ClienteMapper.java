package com.oriontek.Clientes.mapper;

import com.oriontek.Clientes.dto.ClienteRequestDto;
import com.oriontek.Clientes.dto.ClienteResponseDto;
import com.oriontek.Clientes.dto.ClienteUpdateDto;
import com.oriontek.Clientes.models.Cliente;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface ClienteMapper {
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "direcciones", ignore = true)
    Cliente toEntity(ClienteRequestDto dto);
    
    ClienteResponseDto toResponseDto(Cliente entity);
    
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "direcciones", ignore = true)
    void updateEntityFromDto(ClienteUpdateDto dto, @MappingTarget Cliente entity);
}