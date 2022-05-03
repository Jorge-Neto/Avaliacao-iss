import Folha from "../models/Folha";

const folhas = [
  { id: 1, name: "Jorge", language: "JavaScript" },
  { id: 2, name: "Oliveira", language: "Java" },
  { id: 3, name: "Neto", language: "C++" },
];

class FolhasController {
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
