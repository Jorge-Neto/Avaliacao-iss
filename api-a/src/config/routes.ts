import { Router } from "express";
import { FolhaController } from "../controllers/FolhaController";

const routes = Router();

//Default
routes.get("/", (request, response) => {
  response.json({ message: "API de folha de pagamentos" });
});

// Consulta api B
routes.post("/folha/cadastrar", new FolhaController().cadastrar);
routes.get("/folha/calcular", new FolhaController().calcular);

// Somente A
routes.get("/folha/listar", new FolhaController().listar);
routes.put("/folha/alterar/:id", new FolhaController().alterar);
routes.delete("/folha/deletar/:id", new FolhaController().deletar);

export { routes };
