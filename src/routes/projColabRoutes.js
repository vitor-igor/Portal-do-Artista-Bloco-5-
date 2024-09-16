import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

// //todos os blogs
// app.get('/posts', async (req, res) => {
//   try {
//       const posts = await prisma.projColab.findMany({
//           include: { author: true }
//       });
//       res.json(posts);
//   } catch (error) {
//       res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

export default function projColabRoutes(app, upload) {
  
  // Rota para criar um projeto colaborativo com imagem e buscar o autor via e-mail
  app.post('/create-proj-colab', upload.single('photo'), async (req, res) => {
    try {
      const { titulo, email, descricao, localizacao, area, colaboracao } = req.body;
      const imageUrl = req.file ? `/assets/img/uploads/${req.file.filename}` : null; // Caminho da imagem

      // Buscar o usuário no banco de dados pelo e-mail
      const user = await prisma.usuario.findUnique({
        where: { email }
      });

      // Se o usuário não for encontrado, retornar um erro
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado para o e-mail fornecido." });
      }

      // Verificar se o usuário está ativo
      if (!user.ativo) {
        return res.status(403).json({ error: "Usuário inativo. Não é permitido criar projetos colaborativos." });
      }

      // Criar o projeto colaborativo com o ID do usuário (author_id)
      const projColab = await prisma.projColab.create({
        data: {
          title: titulo,
          descricao,
          loc: localizacao,
          area,
          type: colaboracao,
          image_url: imageUrl,
          author: {
            connect: { id: user.id }  // Conectar o projeto ao usuário encontrado
          }
        }
      });

      res.status(201).json(projColab);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar projeto colaborativo.' });
    }
  });

  // Rota para buscar um projeto colaborativo pelo ID
  app.get('/post/:id', async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);

      if (isNaN(projectId)) {
        return res.status(400).json({ error: 'ID inválido.' });
      }

      // Buscar o projeto pelo ID, incluindo o autor
      const project = await prisma.projColab.findUnique({
        where: { id: projectId },
        include: { author: true }
      });

      if (!project) {
        return res.status(404).json({ error: 'Projeto não encontrado.' });
      }

      res.json(project); // Retornar o projeto como JSON
    } catch (error) {
      console.error('Erro ao buscar projeto colaborativo:', error);
      res.status(500).json({ error: 'Erro ao buscar projeto colaborativo.' });
    }
  });

  // Nova rota DELETE para deletar um projeto colaborativo pelo ID
  app.delete('/post/:id', async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);

      // Verificar se o projeto existe
      const project = await prisma.projColab.findUnique({
        where: { id: projectId }
      });

      if (!project) {
        return res.status(404).json({ error: 'Projeto não encontrado.' });
      }

      // Deletar o projeto
      await prisma.projColab.delete({
        where: { id: projectId }
      });

      res.status(200).json({ message: 'Projeto deletado com sucesso.' });
    } catch (error) {
      console.error('Erro ao deletar projeto colaborativo:', error);
      res.status(500).json({ error: 'Erro ao deletar projeto colaborativo.' });
    }
  });
}



  
  
  
// Outras rotas para Projetos Colaborativos (listar, editar, deletar, etc.)