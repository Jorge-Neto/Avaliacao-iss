import amqplib from "amqplib";
import {calculaLiquido} from "../functions/CalculaLiquido.js";

var folhas = [];

class FolhasController {

  // addFolhas(data) {
  //   folhas.push(data);
  //   console.log(folhas);
  // }

  async listar(req, res) {
    var novasFolhas = [];

    const consumer = async () => {
      const queue = 'api-b';
      const conn = await amqplib.connect('amqp://admin:admin@rabbitmq:5672');

      const ch1 = await conn.createChannel();
      await ch1.assertQueue(queue);

      // Listener
      await ch1.consume(queue, (msg) => {
        if (msg !== null) {
          console.log('Recieved:', msg.content.toString());
          let data = JSON.parse(msg.content.toString());
          novasFolhas = data;
          ch1.ack(msg);
        } else {
          console.log('Consumer cancelled by server');
        }
      });
    }

    await consumer();

    if (JSON.stringify(novasFolhas) === "{}") {
      return res.status(400).send({ error: "Request body error" });
    }

    //Calcular o liquido
    novasFolhas.forEach(folha => {
      let salarioBruto = folha.bruto;
      let data =  calculaLiquido(salarioBruto);

      folha = {
        ...folha,
        ...data
      };

      folhas.push(folha);
    });

    if (folhas.length < 1) {
      return res.status(404).send({ error: "There are no registered payrolls" });
    }

    res.status(200).send(folhas);
  }

  listarUm(req, res) {
    const { cpf, mes, ano } = req.params;

    console.log(folhas);
    if (folhas.length < 1) {
      return res.status(404).send({ error: "There are no registered payrolls" });
    }
    console.log(cpf, mes, ano);
    var folha = folhas.map(folha => {
      if (folha.funcionario.cpf === cpf && folha.mes.toString() === mes && folha.ano.toString() === ano) {
        return folha;
      }
    });

    if (folha.length < 1) {
      return res.status(404).send({ error: "Payroll Not Found" });
    }

    res.status(200).send(folha);
  }

}

export default new FolhasController();
