package com.oriontek.Clientes.controller;

import com.oriontek.Clientes.dto.DireccionRequestDto;
import com.oriontek.Clientes.dto.DireccionResponseDto;
import com.oriontek.Clientes.dto.DireccionUpdateDto;
import com.oriontek.Clientes.service.DireccionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/direcciones")
@CrossOrigin(originPatterns = "*", maxAge = 3600)
public class DireccionController {

    private final DireccionService direccionService;

    public DireccionController(DireccionService direccionService) {
        this.direccionService = direccionService;
    }

    @PostMapping
    public ResponseEntity<DireccionResponseDto> createDireccion(@RequestBody DireccionRequestDto direccionRequestDto) {
        DireccionResponseDto direccionResponseDto = direccionService.save(direccionRequestDto);
        return new ResponseEntity<>(direccionResponseDto, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<DireccionResponseDto>> getAllDirecciones() {
        List<DireccionResponseDto> direcciones = direccionService.findAll();
        return ResponseEntity.ok(direcciones);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DireccionResponseDto> getDireccionById(@PathVariable Long id) {
        return direccionService.findById(id)
                .map(direccion -> ResponseEntity.ok(direccion))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<DireccionResponseDto> updateDireccion(
            @PathVariable Long id,
            @RequestBody DireccionUpdateDto direccionUpdateDto) {
        return direccionService.update(id, direccionUpdateDto)
                .map(direccion -> ResponseEntity.ok(direccion))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDireccion(@PathVariable Long id) {
        if (direccionService.deleteById(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}