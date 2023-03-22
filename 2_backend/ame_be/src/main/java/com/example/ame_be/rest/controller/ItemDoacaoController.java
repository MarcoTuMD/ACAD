package com.example.ame_be.rest.controller;

import com.example.ame_be.domain.entity.Beneficiario;
import com.example.ame_be.domain.entity.ItemDoacao;
import com.example.ame_be.domain.repository.Beneficiarios;
import com.example.ame_be.domain.repository.ItensDoacao;
import org.mapstruct.IterableMapping;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/itensDoacao")
public class ItemDoacaoController {

    ItensDoacao itensDoacao;

    public ItemDoacaoController(ItensDoacao itensDoacao) {
        this.itensDoacao = itensDoacao;
    }

    @GetMapping()
    public List<ItemDoacao> findAll(){
        return itensDoacao.findAll();
    };

    @GetMapping("{id}")
    public ItemDoacao getItemDoacaoById(@PathVariable Integer id) {
        return itensDoacao
                .findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND,
                                "Itens não encontrado"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ItemDoacao save(@RequestBody ItemDoacao itemDoacao) {
        return itensDoacao.save(itemDoacao);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        itensDoacao.findById(id)
                .map(cliente -> {
                    itensDoacao.delete(cliente);
                    return cliente;
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Item não encontrado"));
    }

    @PutMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void update( @PathVariable Integer id,
                        @RequestBody ItemDoacao itemDoacao ){
        itensDoacao
                .findById(id)
                .map( clienteExistente -> {
                    itemDoacao.setId(clienteExistente.getId());
                    itensDoacao.save(itemDoacao);
                    return clienteExistente;
                }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Item não encontrado") );
    }
}
