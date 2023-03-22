import { Exercicio } from '@/interfaces/Exercicio';
import { Treino } from '@/interfaces/Treino';
import axios from 'axios';

const base_url = "http://localhost:8080/api/treinos"

export const getTreinosPorAluno = async (cpf: any) => {
    try {
        const response = await axios.get(`${base_url}/${cpf}`);
        return response.data;
    } catch (error) {
        throw error;
    }

}

export const getTeino = async (id: string) => {
    try {
        if (id != "") {
            const response = await axios.get(`${base_url}/${id}`);
            return response;
        }
    } catch (error) {
        throw error;
    }

}

export const postTreino = async (treino: any) => {
    try {
        const response = await axios.post(base_url, treino);
        return response;
    } catch (error) {
        throw error;
    }

}

export const putTreino = async (id: string, treino: Treino) => {
    try {

        const response = await axios.put(`${base_url}/${id}`, treino);
        return response;
    } catch (error) {
        throw error;
    }

}

export const deleteTreino = async (id: string) => {
    try {
        const response = await axios.delete(`${base_url}/${id}`);
        return response;
    } catch (error) {
        throw error;
    }

}
