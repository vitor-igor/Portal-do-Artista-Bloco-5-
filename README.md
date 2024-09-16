# Portal do Artista (Bloco 5)

Esta aplicação se refere a implementação do projeto "Portal do Artista", como parte do desenvolvimento da matéria Projeto Integrador II, especificamente do módulo 5, que compreende: \
  -- Espaço para anúncio de projetos colaborativos; \
  -- Ferramentas para conectar artistas e profissionais do setor cultural; \
  -- Fóruns de discussão e troca de experiências. 
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model Usuario {
  id Int @id @default(autoincrement())
  email String @unique
  password String
  name String
  type String
  ativo String

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt 
}

model ProjColab {
  id Int @id @default(autoincrement())
  descricao String
  title String 
  area String
}