import express from "express";
import morgan from "morgan";
import cors from "cors";
import multer from "multer"; // Para upload de arquivos
import { PrismaClient } from "@prisma/client";
import path from "path"; // Para manipulação de caminhos de arquivos
import projColabRoutes from "./src/routes/projColabRoutes.js"; // Importa as rotas

const app = express();
const prisma = new PrismaClient();
const PORT = 8000;

// Configuração do Multer para salvar arquivos em uma pasta "uploads"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets/img/uploads'); // Pasta onde os arquivos serão salvos
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nome único para cada arquivo
    }
});

const upload = multer({ storage: storage }); // Configura o Multer para upload

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get('/posts', async (req, res) => {
  try {
      const posts = await prisma.projColab.findMany({
          include: { author: true }
      });
      res.json(posts);
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Servir arquivos estáticos
app.use(express.static('public'));

// Rotas para Projetos Colaborativos (CRUD)
projColabRoutes(app, upload);

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});