import axios from "axios";
import { Request, Response } from "express";
import { FolhaRepository } from "../repositories/FolhaRepository";
import RabbitmqServer from "../rabbitmq-server";

var folhaRepository = new FolhaRepository();

export class FolhaController {
  cadastrar(request: Request, response: Response) {
    var folha = request.body;
    var folhas = folhaRepository.cadastrar(folha);

    response.status(201).json({ message: "Folha de pagamento cadastrada", data: folhas });
  }

  async calcular(request: Request, response: Response) {
    var folhasSemProcessar = folhaRepository.listar();
    var folhasProcessadas: any = [];
    let resposta: any = "";

    folhasSemProcessar.map(folha => {
      if (folha.processada === false) {
        folha.bruto = (folha.horas * folha.valor);
        folha.processada = true;
        folhasProcessadas.push(folha);
      }
    });

    // await axios({
    //   method: "post",
    //   url: "http://api-b:3001/folha/listar",
    //   data: folhasProcessadas
    // })
    //   .then((response) => {
    //     resposta = response.data;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    //Envia ao MB
    const server = new RabbitmqServer('amqp://admin:admin@rabbitmq:5672');
    await server.start();
    await server.publishInQueue('api-b', JSON.stringify(folhasProcessadas));

    response.status(201).send("As folhas foram enviadas à api B");
  }

  listar(request: Request, response: Response) {
    var folhas = folhaRepository.listar();

    response.status(200).json({ message: "Lista de folhas de pagamento", data: folhas });
  }

  alterar(request: Request, response: Response) {
    var novaFolha = request.body;
    var id = Number.parseInt(request.params.id, 10);
    var folha = folhaRepository.alterar(id, novaFolha);
    var status: number = 404;
    var message: string = "Folha de pagamento não encontrada"

    if (folha) {
      status = 200;
      message = "Folha de pagamento alterada";
    }
    response.status(status).json({ message: message });

  }

  deletar(request: Request, response: Response) {
    var id = Number.parseInt(request.params.id, 10);
    var removida = folhaRepository.remover(id);

    response.status(200).json({ message: "Folha de pagamento removida", data: removida });
  }
}
