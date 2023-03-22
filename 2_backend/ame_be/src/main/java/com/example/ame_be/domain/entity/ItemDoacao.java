package com.example.ame_be.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table( name = "item_doacao")
public class ItemDoacao {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;

    @Column(name = "nome", length = 100)
    @NotNull(message = "{campo.nome.obrigatorio}")
    private String nome;

    @OneToMany(mappedBy = "itemDoacao")
    private List<Doacao> doacoes;
}
