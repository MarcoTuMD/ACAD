package com.example.ame_be.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.br.CPF;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table( name = "membro_familiar")
public class MembroFamiliar {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "idBeneficiario")
    private Beneficiario beneficiario;

    @Column(name = "dataNasc")
    @NotNull(message = "{campo.dataNasc.obrigatorio}")
    private LocalDate dataNasc;

    @Column(name = "cpf", length = 11)
    @CPF(message = "{campo.cpf.invalido}")
    private String cpf;

    @Column(name = "rg", length = 20)
    private String rg;
}
