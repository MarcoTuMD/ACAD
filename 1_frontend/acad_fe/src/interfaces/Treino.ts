import { Exercicio } from "./Exercicio";

export interface Treino {
    id: number,
    nome: string,
    data_criacao: string,
    aluno: string,
    exercicios: Exercicio[],
}