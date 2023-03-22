import { Equipamento } from '@/interfaces/Equipamento';
import axios from 'axios';

const base_url = "http://localhost:8080/api/equipamentos"


export const getEquipamentos = async () => {
    try {
        const response = await axios.get(base_url);

        const equipamentos: Equipamento[] = [];

        response.data.forEach((element: { id: number; nome: string; }) => {
            const equipamento: Equipamento = {
                id: element.id,
                nome: element.nome
            }
            equipamentos.push(equipamento);
        });

        return equipamentos;
    } catch (error) {
        throw error;
    }

}

export const getEquipamento = async (id: string) => {
    try {
        if (id != "") {
            const response = await axios.get(`${base_url}/${id}`);
            return response;
        }
    } catch (error) {
        throw error;
    }

}

export const postEquipamento = async (str: string) => {
    try {
        const equipamento = {
            nome: str
        }
        const response = await axios.post(base_url, equipamento);
        return response;
    } catch (error) {
        throw error;
    }

}

export const putEquipamento = async (id: string, nome: string) => {
    try {
        const equipamento = {
            nome: nome
        }
        const response = await axios.put(`${base_url}/${id}`, equipamento);
        return response;
    } catch (error) {
        throw error;
    }

}

export const deleteEquipamento = async (id: string) => {
    try {
        const response = await axios.delete(`${base_url}/${id}`);
        return response;
    } catch (error) {
        throw error;
    }

}

