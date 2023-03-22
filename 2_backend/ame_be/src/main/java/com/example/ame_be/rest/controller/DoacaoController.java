package com.example.ame_be.rest.controller;

import com.example.ame_be.domain.entity.Beneficiario;
import com.example.ame_be.domain.entity.Doacao;
import com.example.ame_be.domain.entity.ItemDoacao;
import com.example.ame_be.domain.repository.Doacoes;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/doacoes")
public class DoacaoController {
    Doacoes doacoes;

    public DoacaoController(Doacoes doacoes) {
        this.doacoes = doacoes;
    }

    @GetMapping()
    public List<Doacao> findAll(){
        return doacoes.findAll();
    };

    @GetMapping("{id}")
    public Doacao getDoacaoById(@PathVariable Integer id) {
        return doacoes.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Docao não encontrada"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Doacao save(@RequestBody Doacao doacao) {
        return doacoes.save(doacao);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        doacoes.findById(id)
                .map(doacao -> {
                    doacoes.delete(doacao);
                    return doacao;
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Doacao não encontrada"));
    }

    @PutMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void update(@PathVariable Integer id,
                       @RequestBody Doacao doacao) {
        doacoes
                .findById(id)
                .map(clienteExistente -> {
                    doacao.setId(clienteExistente.getId());
                    doacoes.save(doacao);
                    return clienteExistente;
                }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Doacao não encontrada"));
    }
}
