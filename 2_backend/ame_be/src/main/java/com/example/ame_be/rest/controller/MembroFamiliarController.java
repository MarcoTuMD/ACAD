package com.example.ame_be.rest.controller;

import com.example.ame_be.domain.entity.Beneficiario;
import com.example.ame_be.domain.entity.MembroFamiliar;
import com.example.ame_be.domain.repository.MembrosFamiliares;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/membrosFamiliares")
public class MembroFamiliarController {
    MembrosFamiliares membrosFamiliares;

    public MembroFamiliarController(MembrosFamiliares membrosFamiliares){
        this.membrosFamiliares = membrosFamiliares;
    }

    @GetMapping()
    public List<MembroFamiliar> findAll(){
        return membrosFamiliares.findAll();
    };

    @GetMapping("{id}")
    public MembroFamiliar getMembroFamiliarioById(@PathVariable Integer id) {
        return membrosFamiliares
                .findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND,
                                "Membro não encontrado"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MembroFamiliar save(@RequestBody MembroFamiliar membroFamiliar) {
        return membrosFamiliares.save(membroFamiliar);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        membrosFamiliares.findById(id)
                .map(membroFamiliar -> {
                    membrosFamiliares.delete(membroFamiliar);
                    return membroFamiliar;
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Membro não encontrado"));
    }

    @PutMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void update( @PathVariable Integer id,
                        @RequestBody MembroFamiliar membroFamiliar ){
        membrosFamiliares
                .findById(id)
                .map( clienteExistente -> {
                    membroFamiliar.setId(clienteExistente.getId());
                    membrosFamiliares.save(membroFamiliar);
                    return clienteExistente;
                }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Membro não encontrado") );
    }
}
