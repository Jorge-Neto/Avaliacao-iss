import { Router } from "express";

import folhas from "./app/controllers/FolhasController.js";

const routes = new Router();

routes.get("/", (req, res) => {
    res.json({ message: "API que auxilia a API A" });
});

routes.get("/folha/listar", folhas.listar);
routes.get("/folha/consultar/:cpf/:mes/:ano", folhas.listarUm);

export default routes;
