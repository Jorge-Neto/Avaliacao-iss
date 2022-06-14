import { Folha } from "../models/Folha";

var folhas: Folha[] = [];
let id = 0;

export class FolhaRepository {
    cadastrar(folha: Folha): Folha[] {
        id++;
        folha.id = id;
        folha.processada = false;
        folhas.push(folha);
        return folhas;
    }

    listar(): Folha[] {
        return folhas;
    }

    alterar(id: number, folhaAlterada: Folha) {
        folhaAlterada.id = id;
        const index = folhas.findIndex((folha) => folha.id === id);
        if (index !== -1) {
            folhas.splice(index, 1, folhaAlterada);
            return folhaAlterada;
        }

        return null;

    }

    remover(id: number): Folha {
        const index = folhas.findIndex((folha) => folha.id === id);
        const removida = folhas[index];
        folhas.splice(index, 1);
        return removida;
    }
}
