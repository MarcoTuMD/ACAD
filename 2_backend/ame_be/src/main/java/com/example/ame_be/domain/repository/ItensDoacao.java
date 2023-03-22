package com.example.ame_be.domain.repository;

import com.example.ame_be.domain.entity.ItemDoacao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItensDoacao extends JpaRepository<ItemDoacao, Integer> {
    List<ItemDoacao> findByNome(String nome);

    void deleteByNome(String nome);

    boolean existsByNome(String nome);
}
