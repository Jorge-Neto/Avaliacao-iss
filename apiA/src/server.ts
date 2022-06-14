import express from "express";
import { routes } from "./config/routes";

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3000, () => {
  console.log("Server A is running on port 3000");
});
