import { Equipamento } from '@/interfaces/Equipamento';
import { Exercicio } from '@/interfaces/Exercicio';
import axios from 'axios';

const base_url = "http://localhost:8080/api/exercicios"

export const getExercicios = async () => {
    try {
        const response = await axios.get(base_url);
        const exercicios: Exercicio[] = [];

        response.data.forEach((element: { id: number; nome: string; repeticoes: string, equipamento: number }) => {
            const exercicio: Exercicio = {
                id: element.id,
                nome: element.nome,
                repeticoes: element.repeticoes,
                equipamento: element.equipamento
            }
            exercicios.push(exercicio);
        });
        return exercicios;
    } catch (error) {
        throw error;
    }

}

export const getExercicio = async (id: string) => {
    try {
        if (id != "") {
            const response = await axios.get(`${base_url}/${id}`);
            return response;
        }
    } catch (error) {
        throw error;
    }

}

export const postExercicio = async (exercicio: any) => {
    try {
        const response = await axios.post(base_url, exercicio);
        return response;
    } catch (error) {
        throw error;
    }

}

export const putExercicio = async (id: string, exercicio: Exercicio) => {
    try {

        const response = await axios.put(`${base_url}/${id}`, exercicio);
        return response;
    } catch (error) {
        throw error;
    }

}

export const deleteExercicio = async (id: string) => {
    try {
        const response = await axios.delete(`${base_url}/${id}`);
        return response;
    } catch (error) {
        throw error;
    }

}
