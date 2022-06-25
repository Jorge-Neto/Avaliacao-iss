export interface Folha {
    id: number,
    mes: number;
    ano: number;
    horas: number;
    valor: number;
    funcionario: {
        nome: string,
        cpf: string
    }
    processada: boolean;
    bruto?: number;
}
