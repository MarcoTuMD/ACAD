package com.example.ame_be.domain.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.br.CPF;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "beneficiario")
public class Beneficiario {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;


    @Column(name = "nome", length = 100)
    @NotNull(message = "{campo.nome.obrigatorio}")
    private String nome;

    @Column(name = "telefone", length = 100)
    private String telefone;

    @Column(name = "cpf", length = 11)
    @NotNull(message = "{campo.cpf.obrigatorio}")
    @CPF(message = "{campo.cpf.invalido}")
    private String cpf;

    @Column(name = "endereco", length = 100)
    @NotNull(message = "{campo.endereco.obrigatorio}")
    private String endereco;

    @OneToMany(mappedBy = "beneficiario")
    private List<MembroFamiliar> membrosFamiliar;

    @OneToMany(mappedBy = "beneficiario")
    private List<Doacao> doacoes;
}
