var folhas = [];

class FolhasController {

  listar(req, res) {
    const novasFolhas = req.body;

    novasFolhas.forEach(novaFolha => {
      let aliquotaIR = 1;
      let taxa = 1;

      if (novaFolha.bruto <= 1903.98) {
        aliquotaIR = 1;
        taxa = 0;
      }
      if (novaFolha.bruto >= 1903.99 && novaFolha.bruto <= 2826.65) {
        aliquotaIR = 7.5;
        taxa = 142.80;
      }
      if (novaFolha.bruto >= 2826.66 && novaFolha.bruto <= 3751.05) {
        aliquotaIR = 15;
        taxa = 354.80;
      }
      if (novaFolha.bruto >= 3751.06 && novaFolha.bruto <= 4664.68) {
        aliquotaIR = 22.5;
        taxa = 636.13;
      }
      if (novaFolha.bruto >= 4664.68) {
        aliquotaIR = 27.5;
        taxa = 869.36;
      }
      let ir = ((novaFolha.bruto * (aliquotaIR / 100)) - taxa);
      novaFolha.irrf = parseInt(ir);

      let faixaUm = 135.49;
      let faixaDois = 101.62;
      let faixaTres = 310.51;
      let faixaQuatro = 621.03;
      let descontoInss = 0

      if (novaFolha.bruto <= 1693.72) {
        descontoInss = faixaUm;
      } else if (novaFolha.bruto > 1693.72  && novaFolha.bruto < 2822.91) {
        descontoInss = faixaUm + ((novaFolha.bruto - 1693.73) * 0.09);
      } else if (novaFolha.bruto > 2822.90 && novaFolha.bruto < 5645.81) {
        descontoInss = faixaUm + faixaDois + ((novaFolha.bruto - 2822.91) * 0.11);
      } else if (novaFolha.bruto >= 5645.81 ) {
        descontoInss = faixaUm + faixaDois + faixaTres + faixaQuatro
      }

      novaFolha.inss = parseInt(descontoInss)

      let fgts = (novaFolha.bruto * 0.08);
      novaFolha.fgts = parseInt(fgts);

      novaFolha.liquido = ((novaFolha.bruto - novaFolha.irrf) - novaFolha.inss);
      folhas.push(novaFolha);
    });
    res.send(folhas);
  }

  listarUm(req, res) {
    const {cpf, mes, ano} = req.params;

    var folha = '';
    folha = folhas.map(folha => {
      if (folha.funcionario.cpf === cpf && folha.funcionario.mes === mes && folha.funcionario.ano === ano) {
        return folha;
      }
    });
    console.log(cpf, folha);
    res.send(folha)
  }

  index(req, res) {
    return res.json(folhas);
  }

  show(req, res) {
    const folhaId = parseInt(req.params.id, 10);

    const folha = folhas.find((item) => item.id === folhaId);
    const status = folha ? 200 : 404;

    return res.status(status).json(folha);
  }

  calculate(req, res) {
    const folhaId = parseInt(req.params.id, 10);

    const folha = folhas.find((item) => item.id === folhaId);
    const status = folha ? 200 : 404;

    return res.status(status).json(folha);
  }

  create(req, res) {
    const folha = req.body;
    const id = folhas[folhas.length - 1].id + 1;

    const newFolha = folha;
    folhas.push(newFolha);

    return res.status(201).json(newFolha);
  }

  update(req, res) {
    const id = parseInt(req.params.id, 10);
    const { name, language } = req.body;

    const index = folhas.findIndex((item) => item.id === id);
    const status = index >= 0 ? 200 : 404;

    if (index >= 0) {
      folhas[index] = { id, name, language };
    }

    return res.status(status).json(folhas[index]);
  }

  destroy(req, res) {
    const id = parseInt(req.params.id, 10);

    const index = folhas.findIndex((item) => item.id === id);
    const status = index >= 0 ? 200 : 404;

    if (index >= 0) {
      folhas.splice(index, 1);
    }

    return res.status(status).json(folhas);
  }
}

export default new FolhasController();
