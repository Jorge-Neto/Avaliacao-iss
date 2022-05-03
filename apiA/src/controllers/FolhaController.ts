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
    const folhasSemProcessar = folhaRepository.listar();
    let resposta: any = "";

    folhasSemProcessar.map(folha => {
      if (folha.processada === false) {
        folha.bruto = (folha.horas * folha.valor);
        folha.processada = true;
        folhaRepository.alterar(folha);
        return folha;
      }
    });

    const folhasProcessadas = folhaRepository.listar();
    axios
      .post("http://localhost:3001/folha/listar", folhasProcessadas)
      .then((response) => {
        resposta = response;
      })
      .catch((error) => {
        console.log(error);
      });

    response.status(201).json({ message: "Folha cadastrada", data: resposta });
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
