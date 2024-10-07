// src/db/geocodeAllProjects.js
import fetch from 'node-fetch';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Função de geocodificação (Nominatim)
export async function geocodeAddress(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data && data.length > 0) {
    const { lat, lon } = data[0];
    return { lat: parseFloat(lat), lng: parseFloat(lon) };
  } else {
    console.error(`Geocodificação falhou para o endereço: ${address}`);
    return null;
  }
}

// Função para geocodificar todos os projetos no banco de dados
export async function geocodeAllProjects() {
  const projects = await prisma.projColab.findMany();

  for (let project of projects) {
    if (!project.lat || !project.lng) { // Verificar se já possui coordenadas
      const coords = await geocodeAddress(project.loc); // Assumindo que "loc" contém o endereço completo
      if (coords) {
        // Atualizar o projeto com as coordenadas
        await prisma.projColab.update({
          where: { id: project.id },
          data: {
            lat: coords.lat,
            lng: coords.lng
          }
        });
        console.log(`Geocodificado: ${project.title} -> (${coords.lat}, ${coords.lng})`);
      }
    }
  }

  console.log('Geocodificação concluída.');
}