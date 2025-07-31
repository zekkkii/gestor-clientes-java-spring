package com.oriontek.Clientes.service;

import com.oriontek.Clientes.dto.ClienteRequestDto;
import com.oriontek.Clientes.dto.ClienteResponseDto;
import com.oriontek.Clientes.dto.ClienteUpdateDto;
import com.oriontek.Clientes.mapper.ClienteMapper;
import com.oriontek.Clientes.models.Cliente;
import com.oriontek.Clientes.repository.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final ClienteMapper clienteMapper;

    public ClienteService(ClienteRepository clienteRepository, ClienteMapper clienteMapper) {
        this.clienteRepository = clienteRepository;
        this.clienteMapper = clienteMapper;
    }

    public List<ClienteResponseDto> findAll() {
        return clienteRepository.findAll().stream()
                .map(clienteMapper::toResponseDto)
                .collect(Collectors.toList());
    }

    public Optional<ClienteResponseDto> findById(Long id) {
        return clienteRepository.findById(id)
                .map(clienteMapper::toResponseDto);
    }

    public ClienteResponseDto save(ClienteRequestDto clienteRequestDto) {
        Cliente cliente = clienteMapper.toEntity(clienteRequestDto);
        Cliente savedCliente = clienteRepository.save(cliente);
        return clienteMapper.toResponseDto(savedCliente);
    }

    public Optional<ClienteResponseDto> update(Long id, ClienteUpdateDto clienteUpdateDto) {
        return clienteRepository.findById(id)
                .map(cliente -> {
                    Cliente updatedCliente = clienteRepository.save(cliente);
                    return clienteMapper.toResponseDto(updatedCliente);
                });
    }

    public boolean deleteById(Long id) {
        if (clienteRepository.existsById(id)) {
            clienteRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
