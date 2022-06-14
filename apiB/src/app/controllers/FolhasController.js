import calculaLiquido from "../functions/CalculaLiquido";

var folhas = [];

class FolhasController {

  listar(req, res) {
    let novasfolhas = req.body;

    if (JSON.stringify(novasfolhas) === "{}") {
      return res.status(400).send({ error: "Request body error" });
    }

    novasfolhas.forEach(folha => {
      let salarioBruto = folha.bruto;
      let data = calculaLiquido(salarioBruto);

      folha = {
        ...folha,
        ...data
      };

      novasfolhas.push(folha);
    });

    res.status(200).send(novasfolhas);
  }

  listarUm(req, res) {
    const { cpf, mes, ano } = req.params;

    let folha = folhas.map(folha => {
      if (folha.funcionario.cpf === cpf && folha.ano === ano && folha.mes === mes) {
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
