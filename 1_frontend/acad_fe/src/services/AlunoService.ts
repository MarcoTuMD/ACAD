import { Aluno } from '@/interfaces/Aluno';
import axios from 'axios';

const base_url = "http://localhost:8080/api/alunos"

export const getAlunos = async () => {
    try {
        const response = await axios.get(base_url);

        const alunos: Aluno[] = [];

        response.data.forEach((element: { cpf: string; nome: string; rg: string; endereco: string; telefone: string, email?: string, peso: number, altura: number, objetivo: string, instrutor: string }) => {
            const aluno: Aluno = {
                cpf: element.cpf,
                nome: element.nome,
                rg: element.rg,
                endereco: element.endereco,
                telefone: element.telefone,
                email: element.email,
                peso: element.peso,
                altura: element.altura,
                objetivo: element.objetivo,
                instrutor: element.instrutor
            }
            alunos.push(aluno);
        });

        return alunos;
    } catch (error) {
        throw error;
    }
}

export const getAluno = async (cpf: any) => {
    try {
        if (cpf != "") {
            const response = await axios.get(`${base_url}/${cpf}`);
            return response;
        }
    } catch (error) {
        throw error;
    }

}

export const postAluno = async (aluno: Aluno) => {
    try {
        const response = await axios.post(base_url, aluno);
        return response;
    } catch (error) {
        throw error;
    }

}

export const putAluno = async (cpf: string, aluno: Aluno) => {
    try {

        const response = await axios.put(`${base_url}/${cpf}`, aluno);
        return response;
    } catch (error) {
        throw error;
    }

}

export const deleteAluno = async (cpf: string) => {
    try {
        const response = await axios.delete(`${base_url}/${cpf}`);
        return response;
    } catch (error) {
        throw error;
    }

}


