package com.example.ame_be.rest.controller;

import com.example.ame_be.domain.entity.Beneficiario;
import com.example.ame_be.domain.repository.Beneficiarios;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/beneficiarios")
public class BeneficiarioController {
    private Beneficiarios beneficiarios;

    public BeneficiarioController(Beneficiarios beneficiarios) {
        this.beneficiarios = beneficiarios;
    }

    @GetMapping()
    public  List<Beneficiario> findAll(){
        return beneficiarios.findAll();
    };

    @GetMapping("{id}")
    public Beneficiario getBeneficiarioById(@PathVariable Integer id) {
        return beneficiarios
                .findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND,
                                "Beneficiario não encontrado"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Beneficiario save(@RequestBody Beneficiario beneficiario) {
        return beneficiarios.save(beneficiario);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        beneficiarios.findById(id)
                .map(cliente -> {
                    beneficiarios.delete(cliente);
                    return cliente;
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Beneficiario não encontrado"));
    }

    @PutMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void update( @PathVariable Integer id,
                        @RequestBody Beneficiario beneficiario ){
        beneficiarios
                .findById(id)
                .map( clienteExistente -> {
                    beneficiario.setId(clienteExistente.getId());
                    beneficiarios.save(beneficiario);
                    return clienteExistente;
                }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Beneficiario não encontrado") );
    }

}
