import axios from "axios";
import { Request, Response } from "express";
import { FolhaRepository } from "../repositories/FolhaRepository";

const folhaRepository = new FolhaRepository();

export class FolhaController {
  cadastrar(request: Request, response: Response) {
    const folha = request.body;
    folha.processada = false;
    const folhas = folhaRepository.cadastrar(folha);


    response.status(201).json({ message: "Folha cadastrada na base de dados", data: folhas });
  }

  calcular(request: Request, response: Response) {
    const folha = request.body;
    const folhas = folhaRepository.cadastrar(folha);

    //fetch ou axios
    axios
      .post("http://localhost:3334/folha/cadastrar", folha)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    response.status(201).json({ message: "Folha cadastrado", data: folhas });
  }

  listar(request: Request, response: Response) {
    const folhas = folhaRepository.listar();
    response.status(200).json({ message: "Todas as folhas de pagamento", data: folhas });
  }

  alterar(request: Request, response: Response) {
    const folhas = folhaRepository.alterar(request.body);
    response.status(200).json({ message: "Folha de pagamento atualizada", data: folhas });
  }

  deletar(request: Request, response: Response) {
    const id = Number.parseInt(request.params.id, 10);
    const folhas = folhaRepository.remover(id);
    response.status(200).json({ message: "Folha de pagamento removida", data: folhas });
  }
}
