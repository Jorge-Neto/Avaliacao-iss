import { Router } from "express";
import FolhasController from "./app/controllers/FolhasController.js";

const routes = new Router();

routes.get("/", (req, res) => {
    res.json({ message: "API que auxilia a API A" });
});
routes.get("/teste", (req, res) => {
    return res.json({ message: "Test Ok" });
});

routes.get("/folha/listar", FolhasController.listar);
routes.get("/folha/consultar/:cpf/:mes/:ano", FolhasController.listarUm);

export default routes;
