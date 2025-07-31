package com.oriontek.Clientes.mapper;

import com.oriontek.Clientes.dto.DireccionRequestDto;
import com.oriontek.Clientes.dto.DireccionResponseDto;
import com.oriontek.Clientes.dto.DireccionUpdateDto;
import com.oriontek.Clientes.models.Cliente;
import com.oriontek.Clientes.models.Direccion;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface DireccionMapper {
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "cliente", source = "clienteId", qualifiedByName = "clienteIdToCliente")
    Direccion toEntity(DireccionRequestDto dto);
    
    @Mapping(target = "clienteId", source = "cliente.id")
    DireccionResponseDto toResponseDto(Direccion entity);
    
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "cliente", ignore = true)
    void updateEntityFromDto(DireccionUpdateDto dto, @MappingTarget Direccion entity);
    
    @Named("clienteIdToCliente")
    default Cliente clienteIdToCliente(Long clienteId) {
        if (clienteId == null) {
            return null;
        }
        Cliente cliente = new Cliente();
        cliente.setId(clienteId);
        return cliente;
    }
}