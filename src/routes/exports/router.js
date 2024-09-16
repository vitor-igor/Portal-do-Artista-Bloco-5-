// importações das rotas de cada módulo
import projRoute from "../projColabRoutes.js";

// Abaixo fica a declaração de uso de cada rota
// note que envio uma função, com app como parâmetro
export default function applyRoutes(app) {
  app.use("/proj", projRoute);

    // rota nao existente
  app.all("*", (req, res) => {
    res.status(404).send({ error: "this route does not exist" });
  });
}