import express from "express";
import morgan from "morgan";
import cors from "cors";
import multer from "multer"; // Para upload de arquivos
import { PrismaClient } from "@prisma/client";
import path, { dirname } from "path"; // Para manipulação de caminhos de arquivos
import { fileURLToPath } from 'url'; // Import meta para recriar __dirname
import projColabRoutes from "./src/routes/projColabRoutes.js"; // Importa as rotas
import { geocodeAllProjects } from './src/db/geocodeAllProjects.js';

const app = express();
const prisma = new PrismaClient();
const PORT = 8000;

// Criar __dirname para módulos ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuração do Multer para salvar arquivos em uma pasta "uploads"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'public/assets/img/uploads')); // Pasta onde os arquivos serão salvos
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

// Servir arquivos estáticos (corrigido com __dirname)
app.use(express.static(path.join(__dirname, 'public')));

// Servir arquivos estáticos
app.use(express.static('public'));

// Rodar geocodificação ao iniciar o servidor ou carregar a página
geocodeAllProjects();

// Rota para buscar usuários com filtro
app.get('/api/users', async (req, res) => {
  const { search = "", area = "all" } = req.query;

  console.log(`Pesquisa: ${search}, Área: ${area}`); // Verificar os parâmetros recebidos no backend

  try {
      const users = await prisma.usuario.findMany({
          where: {
              name: {
                  contains: search, // Faz a busca pelo nome
              },
              area: {
                contains: area === 'all' ? undefined : area // Se a área for 'all', não filtra por área
              }
          }
      });

      console.log('Usuários encontrados:', users); // Verificar os usuários retornados

      res.json(users);
  } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

import rotas from './src/routes/exports/router.js'
rotas(app)

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});