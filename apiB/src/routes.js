import { Router } from "express";

import folhas from "./app/controllers/FolhasController";

const routes = new Router();

routes.get("/folha/listar", folhas.listar);
routes.get("/folha/consultar/:cpf/:mes/:ano", folhas.listarUm);

export default routes;
