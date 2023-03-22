package com.example.ame_be.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table( name = "doacao")
public class Doacao {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "idBeneficiario")
    private Beneficiario beneficiario;

    @ManyToOne
    @JoinColumn(name = "id_ITemDoacao")
    private ItemDoacao itemDoacao;

    @Column(name = "data")
    @NotNull(message = "{campo.data.obrigatorio}")
    private LocalDate data;

    @Column(name = "descricao", length = 400)
    private String descricao;

    @Column(name = "quantidade", length = 400)
    @NotNull(message = "{campo.quantidade.obrigatorio}")
    private Integer quantidade;
}
