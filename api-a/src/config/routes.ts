import axios from "axios";
import { Router, Request, Response } from "express";
import { FolhaController } from "../controllers/FolhaController";

const routes = Router();

//Default
routes.get("/", (request, response) => {
  response.json({ message: "API de folha de pagamentos" });
});

// Teste de conexão com api B
routes.get("/teste", async (request: Request, response: Response) => {
  var testing = await axios({
    method: "get",
    url: "http://api-b:3001/teste",
  })
    .then((response) => {
      return response.data;
      })
    .catch((error) => {
      console.log(error);
    });

  return response.send(testing);
});

// Consulta api B
routes.get("/folha/calcular", new FolhaController().calcular);

// Somente A
routes.post("/folha/cadastrar", new FolhaController().cadastrar);
routes.get("/folha/listar", new FolhaController().listar);
routes.put("/folha/alterar/:id", new FolhaController().alterar);
routes.delete("/folha/deletar/:id", new FolhaController().deletar);

export { routes };
