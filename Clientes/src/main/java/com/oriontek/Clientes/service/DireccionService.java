package com.oriontek.Clientes.service;

import com.oriontek.Clientes.dto.DireccionRequestDto;
import com.oriontek.Clientes.dto.DireccionResponseDto;
import com.oriontek.Clientes.dto.DireccionUpdateDto;
import com.oriontek.Clientes.mapper.DireccionMapper;
import com.oriontek.Clientes.models.Direccion;
import com.oriontek.Clientes.repository.DireccionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DireccionService {

    private final DireccionRepository direccionRepository;
    private final DireccionMapper direccionMapper;

    public DireccionService(DireccionRepository direccionRepository, DireccionMapper direccionMapper) {
        this.direccionRepository = direccionRepository;
        this.direccionMapper = direccionMapper;
    }

    public DireccionResponseDto save(DireccionRequestDto direccionRequestDto) {
        Direccion direccion = direccionMapper.toEntity(direccionRequestDto);
        Direccion savedDireccion = direccionRepository.save(direccion);
        
        return direccionMapper.toResponseDto(savedDireccion);
    }

    public List<DireccionResponseDto> findAll() {

        return direccionRepository.findAll().stream()
                .map(direccionMapper::toResponseDto)
                .collect(Collectors.toList());
    }

    public Optional<DireccionResponseDto> findById(Long id) {

        return direccionRepository.findById(id)
                .map(direccionMapper::toResponseDto);
    }

    public Optional<DireccionResponseDto> update(Long id, DireccionUpdateDto direccionUpdateDto) {

        return direccionRepository.findById(id)
                .map(direccion -> {
                    Direccion updatedDireccion = direccionRepository.save(direccion);
                    return direccionMapper.toResponseDto(updatedDireccion);
                });
    }

    public boolean deleteById(Long id) {

        if (direccionRepository.existsById(id)) {
            direccionRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
