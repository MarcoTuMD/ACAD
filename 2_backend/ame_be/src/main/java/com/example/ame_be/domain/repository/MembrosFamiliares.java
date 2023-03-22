package com.example.ame_be.domain.repository;

import com.example.ame_be.domain.entity.Beneficiario;
import com.example.ame_be.domain.entity.MembroFamiliar;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MembrosFamiliares extends JpaRepository<MembroFamiliar, Integer> {
    List<MembroFamiliar> findByBeneficiario(Beneficiario beneficiario);

    MembroFamiliar findByCpf(String cpf);

    void deleteById(Integer id);

    boolean existsByCpf(String cpf);

}
