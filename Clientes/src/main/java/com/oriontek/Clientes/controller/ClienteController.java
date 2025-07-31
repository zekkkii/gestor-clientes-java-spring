package com.oriontek.Clientes.controller;

import com.oriontek.Clientes.dto.ClienteRequestDto;
import com.oriontek.Clientes.dto.ClienteResponseDto;
import com.oriontek.Clientes.dto.ClienteUpdateDto;
import com.oriontek.Clientes.dto.DireccionRequestDto;
import com.oriontek.Clientes.dto.DireccionResponseDto;
import com.oriontek.Clientes.service.ClienteService;
import com.oriontek.Clientes.service.DireccionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(originPatterns = "*", maxAge = 3600)
public class ClienteController {

    private final ClienteService clienteService;
    private final DireccionService direccionService;

    public ClienteController(ClienteService clienteService, DireccionService direccionService) {
        this.clienteService = clienteService;
        this.direccionService = direccionService;
    }

    @GetMapping
    public ResponseEntity<List<ClienteResponseDto>> getAllClientes() {
        List<ClienteResponseDto> clientes = clienteService.findAll();
        return ResponseEntity.ok(clientes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteResponseDto> getClienteById(@PathVariable Long id) {
        return clienteService.findById(id)
                .map(cliente -> ResponseEntity.ok(cliente))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ClienteResponseDto> createCliente(@RequestBody ClienteRequestDto clienteRequestDto) {
        ClienteResponseDto clienteResponseDto = clienteService.save(clienteRequestDto);
        return new ResponseEntity<>(clienteResponseDto, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClienteResponseDto> updateCliente(
            @PathVariable Long id, 
            @RequestBody ClienteUpdateDto clienteUpdateDto) {
        return clienteService.update(id, clienteUpdateDto)
                .map(cliente -> ResponseEntity.ok(cliente))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCliente(@PathVariable Long id) {
        if (clienteService.deleteById(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{clienteId}/direcciones")
    public ResponseEntity<DireccionResponseDto> addDireccion(
            @PathVariable Long clienteId, 
            @RequestBody DireccionRequestDto direccionRequestDto) {
        
        if (!clienteService.findById(clienteId).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        direccionRequestDto.setClienteId(clienteId);
        DireccionResponseDto direccionResponseDto = direccionService.save(direccionRequestDto);
        
        return new ResponseEntity<>(direccionResponseDto, HttpStatus.CREATED);
    }
}
