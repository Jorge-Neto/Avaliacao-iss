import { Router } from "express";

import folhas from "./app/controllers/FolhasController";

const routes = new Router();

routes.get("/folha/calcular", folhas.calculate);

routes.get("/folha", folhas.index);
routes.get("/folha/:id", folhas.show);
routes.post("/folha/cadastrar", folhas.create);
routes.put("/folha/:id", folhas.update);
routes.delete("/folha/:id", folhas.destroy);

export default routes;
