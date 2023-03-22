package com.example.ame_be.domain.repository;

import com.example.ame_be.domain.entity.Beneficiario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface Beneficiarios extends JpaRepository<Beneficiario, Integer> {}
