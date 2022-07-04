import calculaLiquido from "../functions/CalculaLiquido.js";

var folhas = [];

class FolhasController {

  addFolhas(data) {
    folhas.push(data);
  }

  listar(req, res) {
    let novasFolhas = req.body;

    if (JSON.stringify(novasFolhas) === "{}") {
      return res.status(400).send({ error: "Request body error" });
    }

    novasFolhas.forEach(folha => {
      let salarioBruto = folha.bruto;
      let data = calculaLiquido(salarioBruto);

      folha = {
        ...folha,
        ...data
      };

      folhas.push(folha);
    });

    res.status(200).send(novasFolhas);
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
