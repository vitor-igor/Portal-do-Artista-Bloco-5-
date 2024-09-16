import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();
async function main() {
    const data = JSON.parse(fs.readFileSync("src/db/seed.json", "utf-8"));

  // Criar usuários
  for (const usuario of data.usuarios) {
    await prisma.usuario.create({
      data: usuario,
    });
  }

  // Criar projColab
  for (const projColab of data.projs) {
    const { author_id, ...rest } = projColab;
    await prisma.projColab.create({
      data: {
        ...rest,
        author: {
          connect: {
            id: author_id,
          },
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });