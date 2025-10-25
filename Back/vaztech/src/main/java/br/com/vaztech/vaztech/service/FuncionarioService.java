package br.com.vaztech.vaztech.service;

import br.com.vaztech.vaztech.dto.FuncionarioAddRequestDTO;
import br.com.vaztech.vaztech.dto.FuncionarioCardResponseDTO;
import br.com.vaztech.vaztech.dto.FuncionarioResponseDTO;
import java.util.List;

public interface FuncionarioService {

    List<FuncionarioCardResponseDTO> listarFuncionariosAtivos();
    FuncionarioResponseDTO criarFuncionario(FuncionarioAddRequestDTO dto);
}