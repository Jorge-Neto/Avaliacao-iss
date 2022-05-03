import { Router } from "express";
import { FolhaController } from "../controllers/FolhaController";

const routes = Router();

//Default
routes.get("/", (request, response) => {
  response.json({ message: "API de folha de pagamentos" });
});

//Produto
routes.post("/folha/cadastrar", new FolhaController().cadastrar);
routes.get("/folha/calcular", new FolhaController().calcular);

routes.get("/folha/listar", new FolhaController().listar);
routes.put("/folha/alterar", new FolhaController().alterar);
routes.delete("/folha/deletar/:id", new FolhaController().deletar);

export { routes };
