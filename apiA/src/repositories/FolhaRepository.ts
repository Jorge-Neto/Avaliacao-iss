import { Folha } from "../models/Folha";

const folhas: Folha[] = [];
let id = 0;

export class FolhaRepository {
    cadastrar(folha: Folha): Folha[] {
        id++;
        folha.id = id;
        folhas.push(folha);
        return folhas;
    }

    listar(): Folha[] {
        return folhas;
    }

    alterar(folhaAlterada: Folha): Folha[] {
        const index = folhas.findIndex((folha) => folha.id === folhaAlterada.id);
        folhas[index] = folhaAlterada;
        return folhas;
    }

    remover(id: number): Folha[] {
        const index = folhas.findIndex((folha) => folha.id === id);
        folhas.splice(index, 1);
        return folhas;
    }
}
