import { calcularImpostoRenda, calcularInss, calcularFgts } from '../functions/Descontos'

var folhas = [];

class FolhasController {

  listar(req, res) {
    let novasfolhas = req.body;

    if (JSON.stringify(novasfolhas) === "{}") {

      return res.status(404).send({ error: "Request body error"});
    }
    novasfolhas.forEach(folha => {
      let salarioBruto = folha.bruto;

      folha.irrf = calcularImpostoRenda(salarioBruto);
      folha.inss = calcularInss(salarioBruto)
      folha.fgts = calcularFgts(salarioBruto);
      folha.liquido = calcularLiquido(salarioBruto, folha.irrf, folha.inss);

      novasfolhas.push(folha);
    });

    res.status(200).send(novasfolhas);
  }

  listarUm(req, res) {
    const { cpf, mes, ano } = req.params;

    let folha = folhas.map(folha => {
      if (folha.funcionario.cpf === cpf && folha.funcionario.mes === mes && folha.funcionario.ano === ano) {
        return folha;
      }
    });

    if (folha.length < 1) {
        return res.status(404).send({ error: "Not Found"});
    }
    res.status(200).send(folha)
  }

}

export default new FolhasController();
