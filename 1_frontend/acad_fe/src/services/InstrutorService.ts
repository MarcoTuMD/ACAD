import { Instrutor } from '@/interfaces/Instrutor';
import axios from 'axios';

const base_url = "http://localhost:8080/api/instrutores"

export const getInstrutores = async () => {
    try {
        const response = await axios.get(base_url);

        const instrutores: Instrutor[] = [];

        response.data.forEach((element: { cpf: string; nome: string; rg: string; endereco: string; telefone: string, email?: string }) => {
            const instrutor: Instrutor = {
                cpf: element.cpf,
                nome: element.nome,
                rg: element.rg,
                endereco: element.endereco,
                telefone: element.telefone,
                email: element.email
            }
            instrutores.push(instrutor);
        });

        return instrutores;
    } catch (error) {
        throw error;
    }
}

export const getInstrutor = async (cpf: string) => {
    try {
        if (cpf != "") {
            const response = await axios.get(`${base_url}/${cpf}`);
            return response;
        }
    } catch (error) {
        throw error;
    }

}

export const postInstrutor = async (instrutor: Instrutor) => {
    try {
        const response = await axios.post(base_url, instrutor);
        return response;
    } catch (error) {
        throw error;
    }

}

export const putInstrutor = async (cpf: string, instrutor: Instrutor) => {
    try {

        const response = await axios.put(`${base_url}/${cpf}`, instrutor);
        return response;
    } catch (error) {
        throw error;
    }

}

export const deleteInstrutor = async (cpf: string) => {
    try {
        const response = await axios.delete(`${base_url}/${cpf}`);
        return response;
    } catch (error) {
        throw error;
    }

}


