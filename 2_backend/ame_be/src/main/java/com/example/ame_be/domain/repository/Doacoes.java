package com.example.ame_be.domain.repository;

import com.example.ame_be.domain.entity.Beneficiario;
import com.example.ame_be.domain.entity.Doacao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface Doacoes extends JpaRepository<Doacao, Integer> {
    List<Doacao> findByBeneficiario(Beneficiario beneficiario);

    Optional<Doacao> findById(Integer id);

}
